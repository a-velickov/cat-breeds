<template>
    <br />
    <div id="search-container">
        <form v-on:submit.prevent="search()" id="searchForm" class="search-element left">
            <input id="search" type="text" placeholder="Search.." v-model="search_input">
        </form>
        <div class="search-element left dropdown">
            <a class="dropbtn">Search by {{sparam}}</a>
            <div class="dropdown-content">
                <div class="dropdown-element" @click="setSearchParam('wildcard')">Wildcard</div>
                <div class="dropdown-element" @click="setSearchParam('name')">Name</div>
                <div class="dropdown-element" @click="setSearchParam('description')">Description</div>
            </div>
        </div>
        <div class="search-element right" @click="downloadJSON">generate JSON</div>
        <div class="search-element right" @click="downloadCSV">generateCSV</div>
    </div>
    <a :href="'http://localhost:8010/api/file/' + jsonfile" download v-if="jsonfile !== ''">
        <div class="navbar-element right"><i class="fa fa-download"></i> JSON</div>
    </a>
    <a :href="'http://localhost:8010/api/file/' + csvfile" download v-if="csvfile !== ''">
        <div class="navbar-element right"><i class="fa fa-download"></i> CSV</div>
    </a>
    <div id="cb-table-container">
        <table id="cb-table">
            <tr class="cat-breeds">
                <th class="row info" style="font-weight: bold">ID</th>
                <th class="row info" style="font-weight: bold">Name</th>
                <th class="row info" style="font-weight: bold">Type</th>
                <th class="row info" style="font-weight: bold">Origin</th>
                <th class="row info" style="font-weight: bold">Weight(kg)</th>
                <th class="row info" style="font-weight: bold">Lifespan</th>
                <th class="row info" style="font-weight: bold">Ear shape</th>
                <th class="row info" style="font-weight: bold">Eye shape</th>
                <th class="row info" style="font-weight: bold">Eye color</th>
                <th class="row info" style="font-weight: bold">Coat(color:pattern)</th>
                <th class="row info desc" style="font-weight: bold">Description</th>
            </tr>
            <tr class="cat-breeds"
                v-for="(breed, index) in breeds"
                v-bind:item="breed"
                v-bind:index="index"
                v-bind:key="breed.breed_id">
                <th class="row">{{breed.breed_id}}</th>
                <th class="row">{{breed.breed_name}}</th>
                <th class="row">{{breed.coat_type}}</th>
                <th class="row">{{breed.origin}}</th>
                <th class="row">{{breed.weight}}</th>
                <th class="row">{{breed.lifespan}}</th>
                <th class="row">{{breed.ear_shape}}</th>
                <th class="row">{{breed.eye_shape}}</th>
                <th class="row">{{breed.eye_color}}</th>
                <th class="row">{{breed.coat}}</th>
                <th class="row desc">{{breed.description}}</th>
            </tr>
        </table>
        <div v-if="len===0" style="padding:10px; color: white;"> No data to display</div>
    </div>
    <div id="navigation">
        <div class="navbtn next" v-if="len===num" @click="nextPage">next</div>
        <div class="navbtn prev" v-if="page>1" @click="prevPage">previous</div>
    </div>
    <br />
</template>

<script>

import UserService from "../userService" 

    export default {
        name: 'DataTable',
        data() {
            return {
                page: 1,
                num: 5,
                breeds: [],
                len: 0,
                search_input: '',
                sparam: 'wildcard',
                jsonfile: '',
                csvfile: ''
            }
        },
        async mounted() {
            //await new Promise(resolve => {
            //    return setTimeout(resolve, 5000)
            //});
            await this.loadCatBreeds();
        },
        methods: {
            async loadCatBreeds() {
                this.breeds = await UserService.getBreeds(this.num, this.page);
                this.len = this.breeds.length;
            },
            setSearchParam(param) {
                this.sparam = param;
            },
            async search() {
                this.jsonfile = '';
                this.csvfile = '';
                this.breeds = await UserService.getBreedswSearch(this.num, this.page, this.sparam, this.search_input);
                this.len = this.breeds.length;
            },
            async downloadJSON() {
                this.jsonfile = await UserService.downloadJSON(this.sparam, this.search_input, this.num, this.page);
            },
            async downloadCSV() {
                this.csvfile = await UserService.downloadCSV(this.sparam, this.search_input, this.num, this.page);
            },
            async nextPage() {
                this.page = this.page + 1;
                if (this.search_input !== '') await this.search();
                else await this.loadCatBreeds();
            },
            async prevPage() {
                this.page = this.page - 1;
                if (this.search_input !== '') await this.search();
                else await this.loadCatBreeds();
            }
        }
    }
</script>

<style scoped>
    input:focus {
        outline: none;
        border: 2px solid rgb(156, 77, 2);
        box-shadow: 0 0 10px rgb(115,57,1);
    }
    #search-container {
        
        margin: 0;
        padding: 0;
        overflow: hidden;
        /*font-family: Times New Roman, Times, serif;*/
    }
        #search-container div {
            margin-top: 8px;
        }
    .search-element {
        display: inline;
        text-align: center;
        padding: 10px 5px;
        font-size: 17px;
        color: rgb(41, 23, 5);
        font-size: 18px;
    }
        .search-element:hover {
            cursor:pointer;
        }
    .left {
        margin-left:1%;
        float: left;
    }
    .right {
        margin-right: 1%;
        float: right;
        background-color: rgb(252, 169, 88);
    }
    
    .dropdown {
        background-color: rgb(252, 169, 88);
    }
    .dropdown:hover {
        cursor:pointer;
    }
    #search {
        margin-left: 3%;
        padding: 7px;
        font-size: 17px;
    }
    .dropdown-content {
        border-style: inset;
        border-color: rgb(252, 169, 88);
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        z-index: 1;
    }
    .dropdown-content .dropdown-element {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }
    .dropdown-content .dropdown-element:hover {
        cursor: pointer;
        background-color: #f1f1f1;
    }
    .dropdown:hover .dropdown-content {
        display: block;
    }
    #cb-table-container {
        margin: auto;
        margin-top: 3%;
        margin-bottom: 3%;
        margin-left: 3%;
        margin-right: 3%;
        display: table;
        background-color: rgb( 128, 64, 3 );
    }
    .info {
        background-color: rgb(252, 145, 35);
        color: rgb( 59, 29, 0 );
    }

    .cat-breeds {
        margin: 2%;
        background-color: rgb(255, 241, 227);
        align-self: center;
    }

    .row {
        margin-left: 3%;
        margin-right: 3%;
        min-width: 50px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 8px;
        padding-right: 8px;
        text-align: center;
        font-weight: normal;

    }

    tr:nth-child(2n+1) {
        background-color: rgb(252, 222, 192);
    }
    .desc {
        min-width: 150px;
    }

    .navbtn {
        background-color: rgb(252, 145, 35);
        width: 100px;
        display: inline-block;
        padding: 8px;
        margin-bottom: 2%;
    }
    .next{
        margin-right: 3%;
        float: right;
    }
    .prev {
        margin-left: 3%;
        float: left;
        
    }
    .prev:hover, .next:hover {
        cursor: pointer;
        background-color: rgba(232, 112, 28, 0.6);
    }
</style>
