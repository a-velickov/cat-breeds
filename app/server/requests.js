const DB = require('./database').DB;
const express = require('express');
const router = express.Router();
const path = require('path');
const CreateFile = require('./create_file');

module.exports = router;

const apilab3 = require('./apilab3');
router.use('/v2', apilab3);


router.get('/catbreeds', async (req, res) => {
    limit = req.query.num;
    page = req.query.page;
    try {
        const catbreeds = await getCatBreeds(limit, page);
        res.status(200).send(catbreeds);
    } catch (err) {
        res.status(500).send();
    }
});

const { getAllBreeds } = require('./apilab3');

router.get('/refresh', async (req, res) => {
    const catbreeds = await getAllBreeds();
    //console.log(catbreeds);
    CreateFile.createJSON(catbreeds, true);
    CreateFile.createCSV(catbreeds, true);
    res.status(200).send(true);
});

router.get('/userpage', async (req, res) => {
    let user = {};
    if (req.oidc.isAuthenticated()) {
        user.username = await req.oidc.user.nickname;
        user.email = await req.oidc.user.email;
        user.picture = await req.oidc.user.picture;

        //console.log(user);
        res.send(user);
        return
    }
    else res.redirect('/login');
});

router.get('/originalcsv', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'cat_breeds.csv'));
});

router.get('/originaljson', async (req, res) => {
    res.download(path.join(__dirname, '..', 'cat_breeds.json'));
});

router.get('/search/catbreeds', async (req, res) => {
    search_param = req.query.sparam;
    search_input = req.query.sinput;
    limit = req.query.num;
    page = req.query.page;
    const catbreeds = await getBreedwSearch(search_param, search_input, limit, page);
    res.status(200).send(catbreeds);
});

router.get('/createfile/json', async (req, res) => {
    const search_param = req.query.sparam;
    const search_input = req.query.sinput;
    const data = await getDataNum();
    const limit = data.num;
    const page = 1;
    if (search_input === '') return res.send('');
    const catbreeds = await getBreedwSearch(search_param, search_input, limit, page);
    const json_file = CreateFile.createJSON(catbreeds, false);
    res.send(json_file);
});

router.get('/createfile/csv', async (req, res) => {
    const search_param = req.query.sparam;
    const search_input = req.query.sinput;
    const data = await getDataNum();
    const limit = data.num;
    const page = 1;
    if (search_input === '') res.send('');
    const catbreeds = await getBreedwSearch(search_param, search_input, limit, page);
    const csv_file = CreateFile.createCSV(catbreeds, false);
    res.send(csv_file);
});

async function getBreedwSearch(sparam, sinput, limit, page) {
    return new Promise(async(resolve, reject) => {
        try {
            let catbreeds = [];
            switch (sparam) {
                case 'name':
                    catbreeds = await getCatBreedsSearchName(limit, page,sinput);
                    break;
                case 'description':
                    catbreeds = await getCatBreedsSearchDescription(limit, page,sinput);
                    break;
                default:
                    catbreeds = await getCatBreedsSearchAll(limit, page,sinput);
            }
            resolve(catbreeds);
        } catch (err) {
            reject(err);
        }
        
    });
}

router.get('/file/:name', async (req, res) => {
    const name = req.params.name;
    res.download(path.join(__dirname, 'temp-files', name));
});

function getCatBreeds(limit, page) {
    return new Promise((resolve, reject) => {
        const offset = limit * (page-1)
        DB.query(`select breed_id, breed_name, country_name as origin, weight_kg as weight, avg_lifespan as lifespan, ear_shape.shape as ear_shape, 
        eye_shape.shape as eye_shape, description, ct_name as coat_type, (
			select string_agg(ecolor, ', ') from breed_eye left join eye_color on breed_eye.ec_id = eye_color.ec_id
        where breed_id = b.breed_id
		) as eye_color,
		(
			select string_agg(color_name || ':' || cp_name, ', ') 
			from breed_coat left join coat_color on breed_coat.cc_id = coat_color.cc_id
			left join coat_pattern on breed_coat.cp_id = coat_pattern.cp_id
			where breed_id = b.breed_id
		) as coat
        from breed as b left join country on b.origin = country.country_code
        left join ear_shape on b.ear_s_id = ear_shape.ear_s_id
        left join eye_shape on b.eye_s_id = eye_shape.eye_s_id
        left join coat_type on b.ct_id = coat_type.ct_id
		order by breed_name
		limit $1 offset $2`, [limit, offset], function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows);
            }
        })
    });
}

function getCatBreedsSearchDescription(limit, page,search_input) {
    return new Promise((resolve, reject) => {
        const offset = limit * (page - 1)
        DB.query(`select * from (select breed_id, breed_name, country_name as origin, weight_kg as weight, avg_lifespan as lifespan, ear_shape.shape as ear_shape, 
        eye_shape.shape as eye_shape, description, ct_name as coat_type, (
			select string_agg(ecolor, ',') from breed_eye left join eye_color on breed_eye.ec_id = eye_color.ec_id
        where breed_id = b.breed_id
		) as eye_color,
		(
			select string_agg(color_name || ' : ' || cp_name, ',') 
			from breed_coat left join coat_color on breed_coat.cc_id = coat_color.cc_id
			left join coat_pattern on breed_coat.cp_id = coat_pattern.cp_id
			where breed_id = b.breed_id
		) as coat
        from breed as b left join country on b.origin = country.country_code
        left join ear_shape on b.ear_s_id = ear_shape.ear_s_id
        left join eye_shape on b.eye_s_id = eye_shape.eye_s_id
        left join coat_type on b.ct_id = coat_type.ct_id) gg
		where to_tsvector('english', description) @@ to_tsquery('english', $1)
		order by breed_name limit $2 offset $3`, [search_input, limit, offset], function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows);
            }
        })
    });
}
function getCatBreedsSearchName(limit, page,search_input) {
    return new Promise((resolve, reject) => {
        const offset = limit * (page - 1)
        DB.query(`select * from (select breed_id, breed_name, country_name as origin, weight_kg as weight, avg_lifespan as lifespan, ear_shape.shape as ear_shape, 
        eye_shape.shape as eye_shape, description, ct_name as coat_type, (
			select string_agg(ecolor, ',') from breed_eye left join eye_color on breed_eye.ec_id = eye_color.ec_id
        where breed_id = b.breed_id
		) as eye_color,
		(
			select string_agg(color_name || ' : ' || cp_name, ',') 
			from breed_coat left join coat_color on breed_coat.cc_id = coat_color.cc_id
			left join coat_pattern on breed_coat.cp_id = coat_pattern.cp_id
			where breed_id = b.breed_id
		) as coat
        from breed as b left join country on b.origin = country.country_code
        left join ear_shape on b.ear_s_id = ear_shape.ear_s_id
        left join eye_shape on b.eye_s_id = eye_shape.eye_s_id
        left join coat_type on b.ct_id = coat_type.ct_id) gg
		where to_tsvector('english', breed_name) @@ to_tsquery('english', $1)
		order by breed_name limit $2 offset $3`, [search_input, limit, offset], function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows);
            }
        })
    });
}
function getCatBreedsSearchAll(limit, page,search_input) {
    return new Promise((resolve, reject) => {
        const offset = limit * (page - 1);
        DB.query(`select * from (select breed_id, breed_name, country_name as origin, weight_kg as weight, avg_lifespan as lifespan, ear_shape.shape as ear_shape, 
        eye_shape.shape as eye_shape, description, ct_name as coat_type, (
			select string_agg(ecolor, ',') from breed_eye left join eye_color on breed_eye.ec_id = eye_color.ec_id
        where breed_id = b.breed_id
		) as eye_color,
		(
			select string_agg(color_name || ' : ' || cp_name, ',') 
			from breed_coat left join coat_color on breed_coat.cc_id = coat_color.cc_id
			left join coat_pattern on breed_coat.cp_id = coat_pattern.cp_id
			where breed_id = b.breed_id
		) as coat
        from breed as b left join country on b.origin = country.country_code
        left join ear_shape on b.ear_s_id = ear_shape.ear_s_id
        left join eye_shape on b.eye_s_id = eye_shape.eye_s_id
        left join coat_type on b.ct_id = coat_type.ct_id) gg
		where to_tsvector('english', description) @@ to_tsquery('english', $1)
        or to_tsvector('english', breed_name) @@ to_tsquery('english', $1)
        or to_tsvector('english', origin) @@ to_tsquery('english', $1)
        or to_tsvector('english', eye_color) @@ to_tsquery('english', $1)
        or to_tsvector('english', coat) @@ to_tsquery('english', $1)
        or to_tsvector('english', eye_shape) @@ to_tsquery('english', $1)
        or to_tsvector('english', ear_shape) @@ to_tsquery('english', $1)
        or to_tsvector('english', coat_type) @@ to_tsquery('english', $1)
        or to_tsvector('english', weight) @@ to_tsquery('english', $1)
        or to_tsvector('english', lifespan) @@ to_tsquery('english', $1)
		order by breed_name limit $2 offset $3`, [search_input, limit, offset], function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows);
            }
        })
    });
}
function getDataNum() {
    return new Promise((resolve, reject) => {
        const offset = limit * (page - 1);
        DB.query(`select count(*) as num from breed`, function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows[0]);
            }
        })
    });
}