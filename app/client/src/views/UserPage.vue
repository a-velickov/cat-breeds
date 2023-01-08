<template>
    <UnathorizedText v-if="!check"/>
    <NavBar @mount-table="mountTable" @mount-home="mountHome" @mount-user-page="mountUserPage" v-if="check" />
    <div id="home" v-if="check">
        <h1 style="padding-top: 2%">{{user.username}}</h1>
        <img :src="user.picture" />
        <p>WELCOME</p>
        <p>
            This is your user page {{user.username}}.
        </p>
        <p>email: {{user.email}}</p>
        <br />
    </div>
</template>

<script>
    import NavBar from '../components/NavBar.vue'
    import UnathorizedText from '../components/UnathorizedText.vue'
    import UserService from '../userService';

    export default {
        name: 'UserPage',
        components: {
            NavBar,
            UnathorizedText
        },
        data() {
            return {
                user: {},
                check: false
            }
        },
        async created() {
            const data = await UserService.getUserInfo();
            if (data !== false) {
                this.user = data;
                this.check = true;
            }
            else {
                this.check = false;
            }
        }
    //created dohvati sa backenda neke informacije o useru
}</script>

<style scoped>
    #home {
        background-color: rgb(252, 178, 106);
        max-width: 90%;
        margin: auto;
    }

    table {
        max-width: 90%;
        margin: auto;
    }

        table tr th {
            min-width: 150px;
            font-weight: normal;
        }
</style>
