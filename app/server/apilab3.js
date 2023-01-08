const DB = require('./database').DB;
const express = require('express');
const { exists } = require('fs');
const router = express.Router();
const path = require('path');

const fs = require('fs');


module.exports = router;
module.exports.getAllBreeds = getCatBreeds;

const jsonLD = `{"@context": {
	"origin": {
		"@id": "https://schema.org/Country",
		"@type": "https://schema.org/Text"
	},
	"ear-shape": {
		"@id": "https://schema.org/SuperficialAnatomy",
		"@type": "https://schema.org/Text"
	}
},`;



router.get('/catbreeds', async (req, res) => {
    try {
        const catbreeds = await getCatBreeds();
        let cb = `${jsonLD} "catbreeds": ${JSON.stringify(catbreeds)}}`;
        console.log(cb);
        res.status(200).send({
            status: "OK",
            message: "Fetched all cat breeds",
            response: JSON.parse(cb)
        });
    } catch (err) {
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch data from the database",
            response: null
        });
    }
});
router.post('/catbreeds', async (req, res) => {
    //treba ih bit 10
    const name = req.body.name;
    const weight = req.body.weight;
    const lifespan = req.body.lifespan;
    const desc = req.body.desc;
    const coo = req.body.coo;
    const ct = req.body.ct;
    const eyecolors = req.body.eyecolors;
    const earshape = req.body.earshape;
    const eyeshape = req.body.eyeshape;
    const coats = req.body.coats;

    if (name == null || weight == null || lifespan == null || desc == null ||
        coo == null || ct == null || eyecolors == null || earshape == null ||
        eyeshape == null || coats == null ) {
        res.status(400).send({
            status: "Bad request",
            message: `Missing one or more required values.`,
            response: null
        });
        return;
    }

    //provjera tezine
    let sweight = weight.split('-');
    if (weight.trim() === "" || isNaN(sweight[0]) || sweight.length > 2) {
        res.status(400).send({
            status: "Bad request",
            message: `The given value for weight is of wrong type.`,
            response: null
        });
        return;
    }
    else if (sweight.length === 2 && (isNaN(sweight[0]) || isNaN(sweight[1]))) {
        res.status(400).send({
            status: "Bad request",
            message: `The given value for weight is of wrong type.`,
            response: null
        });
        return;
    }
    //provjera lifespan
    let slifespan = lifespan.split('-');
    if (lifespan.trim() === "" || isNaN(slifespan[0]) || slifespan.length > 2) {
        res.status(400).send({
            status: "Bad request",
            message: `The given value for lifespan is of wrong type.`,
            response: null
        });
        return;
    }
    else if (slifespan.length === 2 && (isNaN(slifespan[0]) || isNaN(slifespan[1]))) {
        res.status(400).send({
            status: "Bad request",
            message: `The given value for lifespan is of wrong type.`,
            response: null
        });
        return;
    }
    //provjera coo
    let cooid = "";
    let ctid = "";
    let ersid = "";
    let esid = "";
    let coatc_id = [];
    let coatp_id = [];
    let ecid = [];
    try {
        cooid = await getOrigin(coo);
        if (cooid === false) {
            res.status(400).send({
                status: "Bad request",
                message: `Country of origin of the given value does not exist in the database.`,
                response: null
            });
            return;
        }
        //provjera coat type
        ctid = await getCoatType(ct);
        if (ctid === false) {
            res.status(400).send({
                status: "Bad request",
                message: `Given coat type does not exist.`,
                response: null
            });
            return;
        }
        //provjera ear shape
        ersid = await getEarShape(earshape);
        if (ersid === false) {
            res.status(400).send({
                status: "Bad request",
                message: `Given ear shape does not exist.`,
                response: null
            });
            return;
        }
        //provjera eyeshape
        esid = await getEyeShape(eyeshape);
        if (esid === false) {
            res.status(400).send({
                status: "Bad request",
                message: `Given eye shape does not exist.`,
                response: null
            });
            return;
        }
        //hmm trebala bi primati array color:pattern,...
        let coatc = [];
        let coatp = [];
        let scoats = coats.split(',');
        if (scoats.length === 1) {
            let scoat = scoats[0].split(':');
            if (scoat.length != 2) {
                res.status(400).send({
                    status: "Bad request",
                    message: `Given coat pattern and/or color does not exist.`,
                    response: null
                });
                return;
            }
            else { coatc.push(scoat[0]); coatp.push(scoat[1]); }
        }
        else {
            for (let coat in scoats) {
                scoat = coat.split(':');
                if (scoat.length != 2) {
                    res.status(400).send({
                        status: "Bad request",
                        message: `Given coat pattern and/or color does not exist.`,
                        response: null
                    });
                    return;
                }
                else { coatc.push(scoat[0]); coatp.push(scoat[1]); }
            }
        }
        for (let i = 0; i < scoats.length; i++) {
            try {
                let result = await getCoatColorID(coatc[i]);
                coatc_id.push(result);
                let result2 = await getCoatPatternID(coatp[i]);
                coatp_id.push(result2);
                if (result === false || result2 === false) {
                    res.status(400).send({
                        status: "Bad request",
                        message: `Given coat pattern and/or color does not exist.`,
                        response: null
                    });
                    return;
                }
            } catch (err) {
                res.status(500).send({
                    status: "Internal server error",
                    message: "An error ocurred while trying to fetch data from the database",
                    response: null
                });
                return;
            }
        }
        //trebala bi primati array? boja
        let seyecolors = eyecolors.split(',');
        if (seyecolors.length === 1) {
            let result = await getEyeColorID(seyecolors[0]);
            if (result === false) {
                res.status(400).send({
                    status: "Bad request",
                    message: `Given eye color does not exist.`,
                    response: null
                });
                return;
            }
            else ecid.push(result);
        }
        else {
            for (let eyecolor in eyecolors) {
                try {
                    let id = await getEyeColorID(eyecolor);
                    if (id === false) {
                        res.status(400).send({
                            status: "Bad request",
                            message: `Given eye color does not exist.`,
                            response: null
                        });
                        return;
                    }
                    ecid.push(id);
                } catch (err) {
                    res.status(500).send({
                        status: "Internal server error",
                        message: "An error ocurred while trying to fetch data from the database",
                        response: null
                    });
                    return;
                }
            }
        }
    } catch (err) {
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch data from the database",
            response: null
        });
        return;
    }

    //dodavanje u bazu
    //console.log("SVI PODACI KAO U REDU");
    try {
        //console.log(name + ',' + weight + ',' + lifespan + ',' + cooid + ',' + ersid + ',' + esid + ',' + desc);
        await addCatBreed(name, weight, lifespan, cooid, ctid, ersid, esid, desc);
        const breedid = await getBreedID();
        for (let i = 0; i < coatc_id.length; i++) {
            await addCatBreedCoat(breedid, coatp_id[i], coatc_id[i]);
        }
        for (let i = 0; i < ecid.length; i++) {
            await addCatBreedEye(breedid, ecid[i]);
        }
        res.status(201).send({
            status: "Created",
            message: "Successfully added new cat breed into the database.",
            response: null
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to add data to the database",
            response: null
        });
        return;
    }
});

router.all('/catbreeds', async (req, res) => {
    res.status(501).send({
        status: "Not implemented",
        message: "The requested method is not implemented.",
        response: null
    });
});

router.get('/catbreeds/id/:id', async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || id.trim() === "") {
        res.status(400).send({
            status: "Bad request",
            message: `The given value for ID is of wrong type, it must be a number.`,
            response: null
        });
        return;
    }
    try {
        const catbreed = await getCatBreed(id);
        let cb = `${jsonLD} "catbreeds": ${JSON.stringify(catbreed)}}`;
        if (catbreed.length === 0) {
            res.status(404).send({
                status: "Not found",
                message: `Cat breed with the id of ${id} does not exist in the database.`,
                response: null
            });
        }
        else {
            res.status(200).send({
                status: "OK",
                message: `Fetched cat breed with ID ${id}.`,
                response: JSON.parse(cb)
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch data from the database",
            response: null
        });
    }
});

router.put('/catbreeds/id/:id', async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || id.trim() === "") {
        res.status(400).send({
            status: "Bad request",
            message: `The given value for ID is of wrong type, it must be a number.`,
            response: null
        });
        return;
    }
    try {
        const catbreed = await getCatBreed(id);
        if (catbreed.length === 0) {
            res.status(410).send({
                status: "Gone",
                message: `Cat breed with the id of ${id} was removed from the database.`,
                response: null
            });
        }
        else {
            res.status(200).send({
                status: "OK",
                message: `Fetched cat breed with ID ${id}.`,
                response: catbreed
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch data from the database",
            response: null
        });
    }
});

router.delete('/catbreeds/id/:id', async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || id.trim() === "") {
        res.status(400).send({
            status: "Bad request",
            message: `The given value for ID is of wrong type, it must be a number.`,
            response: null
        });
        return;
    }
    try {
        const count = await deleteCatBreed(id);
        if (count === 1) {
            res.status(200).send({
                status: "OK",
                message: `Succesfully removed breed with the id ${id} from the database.`,
                response: null
            });
        }
        else {
            res.status(404).send({
                status: "Not found",
                message: `Data that was attempted to be deleted does not exist.`,
                response: null
            });
        }
    } catch {
        console.log(err);
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch data from the database",
            response: null
        });
    }
});

router.all('/catbreeds/id/:id', async (req, res) => {
    res.status(501).send({ status: "Not implemented", message: "The requested method is not implemented.", response: null });
});

router.get('/catbreeds/openapi', async (req, res) => {
    try {
        if (fs.existsSync(path.join(__dirname, '..', 'openapi.json'))) {
            res.status(200).sendFile(path.join(__dirname, '..', 'openapi.json'));
        }
        else res.status(404).send({ status: "Not found", message: "The openapi file wasn't found." })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch the file",
            response: null
        });
    }
});

//bar jos 3 get

router.get('/catbreeds/eyeshape/:es', async (req, res) => {
    const es = req.params.es;
    if (es.trim() === "") {
        res.status(400).send({
            status: "Bad request",
            message: `There was no given value for eye shape`,
            response: null
        });
        return;
    }
    try {
        const eyeshape = await getEyeShape(es);
        if (eyeshape === false) {
            res.status(400).send({
                status: "Bad request",
                message: `The database does not contain eye shape ${es}.`,
                response: null
            });
            return;
        }
        const catbreeds = await getCatBreedbyES(es);
        let cb = `${jsonLD} "catbreeds": ${JSON.stringify(catbreeds)}}`;
        //console.log(catbreeds.length);
        if (catbreeds.length === 0) {
            res.status(404).send({
                status: "Not found",
                message: `The database does not contain cat breeds with the ${es} eye shape.`,
                response: null
            });
        }
        else {
            res.status(200).send({
                status: "OK",
                message: `Fetched all cat breeds with eye color ${es}.`,
                response: JSON.parse(cb)
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch data from the database",
            response: null
        });
    }
});

router.all('/catbreeds/eyeshape/:es', async (req, res) => {
    res.status(501).send({
        status: "Not implemented",
        message: "The requested method is not implemented.",
        response: null
    });
});

router.get('/catbreeds/coat_type/:ct', async (req, res) => {
    const ct = req.params.ct;
    if (ct.trim() === "") {
        res.status(400).send({
            status: "Bad request",
            message: `There was no given value for coat type`,
            response: null
        });
        return;
    }
    try {
        const coatt = await getCoatType(ct);
        if (coatt === false) {
            res.status(400).send({
                status: "Bad request",
                message: `The database does not contain coat-type ${ct}.`,
                response: null
            });
            return;
        }
        const catbreeds = await getCatBreedbyCT(ct);
        let cb = `${jsonLD} "catbreeds": ${JSON.stringify(catbreeds)}}`;
        if (catbreeds.length === 0) {
            res.status(404).send({
                status: "Not found",
                message: `Cat breed with coat type of ${ct} does not exist in the database.`,
                response: null
            });
        }
        else {
            res.status(200).send({
                status: "OK",
                message: `Fetched cat breed with coat type ${ct}.`,
                response: JSON.parse(cb)
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch data from the database",
            response: null
        });
    }
});

router.all('/catbreeds/coat_type/:ct', async (req, res) => {
    res.status(501).send({
        status: "Not implemented",
        message: "The requested method is not implemented.",
        response: null
    });
});

router.get('/catbreeds/countryoforigin/:coo', async (req, res) => {
    const coo = req.params.coo;
    if (coo.trim() === "") {
        res.status(400).send({
            status: "Bad request",
            message: `There was no given value for country of origin`,
            response: null
        });
        return;
    }
    try {
        const country = await getOrigin(coo);
        if (country === false) {
            res.status(400).send({
                status: "Bad request",
                message: `The database does not contain country ${coo}.`,
                response: null
            });
            return;
        }
        const catbreeds = await getCatBreedbyCOO(coo);
        let cb = `${jsonLD} "catbreeds": ${JSON.stringify(catbreeds)}}`;
        if (catbreeds.length === 0) {
            res.status(404).send({
                status: "Not found",
                message: `The database does not contain cat breeds that originated in ${coo}.`,
                response: null
            });
        }
        else {
            res.status(200).send({
                status: "OK",
                message: `Fetched all cat breeds whose country of origin is ${coo}.`,
                response: JSON.parse(cb)
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            status: "Internal server error",
            message: "An error ocurred while trying to fetch data from the database",
            response: null
        });
    }
});

router.all('/catbreeds/countryoforigin/:coo', async (req, res) => {
    res.status(501).send({
        status: "Not implemented",
        message: "The requested method is not implemented.",
        response: null
    });
});

router.get('/*', (req, res) => {
    res.status(404).send({ status: "Not found", message: "The route you're looking for doesn't exist" });
});




//osnovni sql select string
const db_breedstr = `select breed_id, breed_name, country_name as origin, weight_kg as weight, avg_lifespan as lifespan, ear_shape.shape as ear_shape, 
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
        left join coat_type on b.ct_id = coat_type.ct_id`;

const db_breeds_orderby = ` order by breed_name`;

//sva dohvacanja iz baze
function getCatBreeds() {
    return new Promise((resolve, reject) => {
        const querystr = db_breedstr + db_breeds_orderby
        DB.query(`${querystr}`, function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows);
            }
        })
    });
}

function getCatBreed(id) {
    return new Promise((resolve, reject) => {
        const querystr = db_breedstr + " where breed_id = $1" + db_breeds_orderby;
        DB.query(`${querystr}`,[id], function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows);
            }
        })
    });
}

function getCatBreedbyCT(ct) {
    return new Promise((resolve, reject) => {
        const querystr = db_breedstr + " where lower(coat_type.ct_name) = lower($1) or lower(coat_type.ct_id) = lower($2)" + db_breeds_orderby;
        DB.query(`${querystr}`, [ct, ct], function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows);
            }
        })
    });
}

function getCatBreedbyCOO(coo) {
    return new Promise((resolve, reject) => {
        //let likecoo = '%' + coo + '%';
        const querystr = db_breedstr + " where lower(country.country_code) = lower($1) or lower(country.country_name) = lower($1)" + db_breeds_orderby;
        DB.query(`${querystr}`, [coo], function (err, results) {
            if (err) reject(err);
            else {
                resolve(results.rows);
            }
        })
    });
}

function getCatBreedbyES(es) {
    return new Promise((resolve, reject) => {
        let ec = '%' + es + '%';
        const querystr = db_breedstr + " where lower(eye_shape.shape) like lower($1) or lower(eye_shape.eye_s_id) = lower($2)" + db_breeds_orderby;
        DB.query(`${querystr}`, [ec, es], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                //console.log(results);
                resolve(results.rows);
            }
        })
    });
}

function addCatBreed(name, weight, lifespan, coo, ct_id, ear_s_id, eye_s_id, desc) {
    return new Promise((resolve, reject) => {
        const querystr = `insert into breed(breed_name, weight_kg, avg_lifespan, origin, ct_id, ear_s_id, eye_s_id, description)
                            values($1, $2, $3, $4, $5, $6, $7, $8 );`;
        DB.query(`${querystr}`, [name, weight, lifespan, coo, ct_id, ear_s_id, eye_s_id, desc], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(results.rowCount);
            }
        })
    });
}
function addCatBreedCoat(breed_id, coatp_id, coatc_id) {
    return new Promise((resolve, reject) => {
        const querystr = `insert into breed_coat(breed_id, cp_id, cc_id) values($1, $2, $3);`;
        DB.query(`${querystr}`, [breed_id, coatp_id, coatc_id], function (err, results) {
            if (err) {
                console.log("PUKLO U KRZNU");
                console.log(err);
                reject(err);
            }
            else {
                resolve(results.rowCount);
            }
        })
    });
}
function addCatBreedEye(breed_id, ec_id) {
    return new Promise((resolve, reject) => {
        const querystr = `insert into breed_eye(breed_id, ec_id) values($1, $2);`;
        DB.query(`${querystr}`, [breed_id, ec_id], function (err, results) {
            if (err) {
                console.log("PUKLO U OCIMA");
                console.log(err);
                reject(err);
            }
            else {
                resolve(results.rowCount);
            }
        })
    });
}

function deleteCatBreed(id) {
    return new Promise((resolve, reject) => {
        const querystr = "delete from breed where breed_id = $1";
        DB.query(`${querystr}`, [id], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(results.rowCount);
            }
        })
    });
}

//add-on methods for add (eye color, coat color, origin, coat type, eyeshape, erashape)
function getEyeColorID(ec) {
    return new Promise((resolve, reject) => {
        ec = '%' + ec + '%';
        const querystr = "select ec_id from eye_color where lower(ecolor) like lower($1)";
        DB.query(`${querystr}`, [ec], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if (results.rowCount === 0) resolve(false);
                else resolve(results.rows[0].ec_id);
            }
        })
    });
}
function getCoatColorID(cc) {
    return new Promise((resolve, reject) => {
        const querystr = "select cc_id from coat_color where lower(color_name) = lower($1)";
        DB.query(`${querystr}`, [cc], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if (results.rowCount === 0) resolve(false);
                else resolve(results.rows[0].cc_id);
            }
        })
    });
}
function getCoatPatternID(cp) {
    return new Promise((resolve, reject) => {
        const querystr = "select cp_id from coat_pattern where lower(cp_id) = lower($1) or lower(cp_name) = lower($1)";
        DB.query(`${querystr}`, [cp], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if (results.rowCount === 0) resolve(false);
                else resolve(results.rows[0].cp_id);
            }
        })
    });
}

function getOrigin(coo) {
    return new Promise((resolve, reject) => {
        //sconsole.log(coo);
        const querystr = "select country_code from country where lower(country_code) = lower($1) or lower(country_name) = lower($1)";
        DB.query(`${querystr}`,[coo], function (err, results) {
            if (err) {
                console.log("COO ERROR");
                reject(err);
            }
            else {
                if (results.rowCount === 0) resolve(false);
                else resolve(results.rows[0].country_code);
            }
        })
    });
}
function getCoatType(ct) {
    return new Promise((resolve, reject) => {
        const querystr = "select ct_id from coat_type where lower(ct_id) = lower($1) or lower(ct_name) = lower($1)";
        DB.query(`${querystr}`, [ct], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if (results.rowCount === 0) resolve(false);
                else resolve(results.rows[0].ct_id);
            }
        })
    });
}
function getEyeShape(es) {
    return new Promise((resolve, reject) => {
        const querystr = "select eye_s_id from eye_shape where lower(eye_s_id) = lower($1) or lower(shape) = lower($1)";
        DB.query(`${querystr}`, [es], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if (results.rowCount === 0) resolve(false);
                else resolve(results.rows[0].eye_s_id);
            }
        })
    });
}
function getEarShape(es) {
    return new Promise((resolve, reject) => {
        const querystr = "select ear_s_id from ear_shape where lower(ear_s_id) = lower($1) or lower(shape) = lower($1)";
        DB.query(`${querystr}`, [es], function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if (results.rowCount === 0) resolve(false);
                else resolve(results.rows[0].ear_s_id);
            }
        })
    });
}

function getBreedID() {
    return new Promise((resolve, reject) => {
        const querystr = "select max(breed_id) as id from breed";
        DB.query(`${querystr}`, function (err, results) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                if (results.rowCount === 0) resolve(false);
                else resolve(results.rows[0].id);
            }
        })
    });
}