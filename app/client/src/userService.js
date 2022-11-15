import axios from 'axios';
axios.defaults.withCredentials = true;

class UserService {
    static getBreeds(num, page) {
        return new Promise((resolve, reject) => {
            axios.get('api/catbreeds', {
                params: { num: num, page: page }
            })
                .then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
    static getBreedswSearch(num, page, sparam, sinput) {
        return new Promise((resolve, reject) => {
            axios.get('api/search/catbreeds', {
                params: {
                    num: num, page: page,
                    sparam: sparam, sinput: sinput
                }
            })
                .then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
    static downloadJSON(sparam, sinput, num, page) {
        return new Promise((resolve, reject) => {
            axios.get('api/createfile/json', {
                params: {
                    sparam: sparam, sinput: sinput,
                    num: num, page: page
                }
            })
                .then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
    static downloadCSV(sparam, sinput, num, page) {
        return new Promise((resolve, reject) => {
            axios.get('api/createfile/csv', {
                params: {
                    sparam: sparam, sinput: sinput,
                    num: num, page: page
                }
            })
                .then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
}

export default UserService;