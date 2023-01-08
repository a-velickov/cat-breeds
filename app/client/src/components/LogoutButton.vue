<template>
    <a href="http://localhost:8010/logout">
        <div class="navbar-element element-right"> Logout</div>
    </a>
</template>

<script>export default {
        name: 'LogoutButton'
    }</script>

<style scoped>
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
            background-color: rgba(237, 100, 40);
        }

    .element-right {
        background-color: rgb(252, 115, 56);
        float: right;
    }
</style>
