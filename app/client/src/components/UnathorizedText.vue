<template>
    <div id="home">
        <h1 style="padding-top: 2%; padding-bottom: 2%">401 Unathorized</h1>
        <div>Please login first</div>
        <a href="http://localhost:8010/login" style="padding-top: 2%; padding-bottom: 2%">
            <div>Login</div>
        </a>
        <div style="padding-top: 2%; padding-bottom: 2%">
            <a href="/" style="padding-top: 2%; padding-bottom: 2%">
                <div><i class="fa fa-home"></i>Home</div>
            </a>
        </div>
    </div>
</template>

<script>export default {
        name: 'UnathorizedText'
    //created dohvati sa backenda neke informacije o useru
}</script>

<style scoped>
    #home {
        background-color: rgb(252, 178, 106);
        max-width: 90%;
        margin: auto;
    }
</style>
