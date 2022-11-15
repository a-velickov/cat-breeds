<template>
    <!--navigacija koja vodi do table i do downloada za json i csv-->
    <div id="navbar">
        <div class="navbar-element element-left" @click="showHome"><i class="fa fa-home"></i> Home</div>
        <div class="navbar-element element-left" @click="showTable">Table</div>

        <a href="http://localhost:8010/api/originalcsv" download>
            <div class="navbar-element element-right"><i class="fa fa-download"></i> CSV</div>
        </a>
        <a href="http://localhost:8010/api/originaljson" download>
            <div class="navbar-element element-right"><i class="fa fa-download"></i> JSON</div>
        </a>
    </div>
</template>

<script>

    export default {
        name: 'NavBar',
        methods: {
            showTable() {
                this.$emit("mount-table");
            },
            showHome() {
                this.$emit("mount-home");
            }
        }
    }
</script>

<style scoped>
    #navbar {
        background-color: rgb(252, 145, 35);
        margin: 0;
        padding: 0;
        overflow: hidden;
        /*font-family: Times New Roman, Times, serif;*/
    }
    .navbar-element {
        display: block;
        text-align: center;
        padding: 12px 20px;
        color: rgb(41, 23, 5);
        font-weight: bold;
        font-size: 18px;
    }
        .navbar-element:hover {
            cursor: pointer;
            background-color: rgba(232, 112, 28, 0.6);
        }
    .element-left {
        margin-right:2%;
        float: left;
    }
    .element-right {
        background-color: rgb(250, 158, 52);
        margin-right: 2%;
        float: right;
    }
</style>
