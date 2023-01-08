//klasa sa staticnim metodama za kreiranje json i csv datoteke iz predanog skupa polja podataka
const DB = require('./database').DB;
const path = require('path');

class CreateFile {
    static createCSV(breeds, mainfile) {
        const name = Date.now().toString() + '.csv';
        let out = null;
        if (mainfile) out = require("fs").createWriteStream(path.join(__dirname, '..', 'cat_breeds.csv'));
        else out = require("fs").createWriteStream(path.join(__dirname, 'temp-files', name));
        out.write('breed_ID; breed_name;origin;weight_kg; avg_lifespan; ear_shape; eye_shape; eye_color; coat_type; coat_color-coat_pattern; description\n');
        for (let breed of breeds) {
            const coats = breed.coat.split(',');
            const eyecolors = breed.eye_color.split(',');
            for (let coat of coats) {
                coat = coat.replace(':', '-');
                out.write(breed.breed_id + ';' + breed.breed_name + ';' + breed.origin + ';' + breed.weight + ';'
                    + breed.lifespan + ';' + breed.ear_shape + ';' + breed.eye_shape + ';' + eyecolors.join('/') + ';'
                    + breed.coat_type + ';' + coat + ';' + breed.description + '\n'
                );
            }
        }
        out.close();
        return name;
    }
    static createJSON(breeds, mainfile) {
        const name = Date.now().toString() + '.json';
        let out = null;
        if (mainfile) out = require("fs").createWriteStream(path.join(__dirname, '..', 'cat_breeds.json'));
        else out = require("fs").createWriteStream(path.join(__dirname, 'temp-files', name));
        out.write('[');
        const blen = breeds.length;
        let i = 1;

        for (let breed of breeds) {
            out.write(`{"breed_ID": "` + breed.breed_id + `", "breed_name": "` + breed.breed_name + `", "origin": "` + breed.origin
                + `", "weight_kg": "` + breed.weight + `", "avg_lifespan": "` + breed.lifespan + `", "ear_shape": "`
                + breed.ear_shape + `", "eye_shape": "` + breed.eye_shape + `", "eye_color": [`);
            const colors = breed.eye_color.split(',');
            const elen = colors.length;
            let j = 1;
            for (let color of colors) {
                out.write(`"` + color + `"`);
                if (elen !== j) out.write(`, `);
                j++;
            }
            out.write(`], "coat_type": "` + breed.coat_type + `", "coat":[`);
            const coats = breed.coat.split(',');
            const clen = coats.length;
            j = 1;
            for (let coat of coats) {
                const coat_el = coat.split(':');
                out.write(`{"color": "` + coat_el[0] + `", "pattern": "` + coat_el[1] + `"}`);
                if (clen !== j) out.write(`, `);
                j++;
            }
            out.write(`], "description": "` + breed.description + `"}`);
            if (blen !== i) out.write(",\n");
            i++;
        }
        out.write(']');
        out.close();
        return name;
    }
}

module.exports = CreateFile;