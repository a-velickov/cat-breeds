import axios from 'axios';
axios.defaults.withCredentials = true;

class UserService {
    static getUser() {
        return new Promise((resolve, reject) => {
            axios.get('api/getuser')
                .then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
    static getUserInfo() {
        return new Promise((resolve, reject) => {
            axios.get('api/userpage')
                .then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
    static refreshJSON() {
        return new Promise((resolve, reject) => {
            axios.get('api/refresh')
                .then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
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