<template>
    <NavBar @mount-table="mountTable" @mount-home="mountHome" />
    <HomeComponent v-if="hmount" />
    <DataTable v-if="tmount" />
    <UserPage v-if="upmount" />
</template>

<script>
    import DataTable from './components/DataTable.vue'
    import NavBar from './components/NavBar.vue'
    import HomeComponent from './components/Home.vue'
    //import UserPage from './components/UserPage.vue'

    export default {
        name: 'App',
        components: {
            NavBar,
            DataTable,
            HomeComponent,
            //UserPage
        },
        data() {
            return {
                tmount: false,
                hmount: true,
                upmount: false
            }
        },
        methods: {
            mountHome() {
                this.hmount = true;
                this.tmount = false;
                this.upmount = false;
            },
            mountTable() {
                this.tmount = true;
                this.hmount = false;
                this.upmount = false;
            },
            mountUserPage() {
                this.upmount = true;
                this.tmount = false;
                this.hmount = false;
            }
        }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: rgb(41, 23, 5);
    }
</style>
