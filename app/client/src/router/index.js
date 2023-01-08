import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from '../views/PageNotFound'
import Home from '../Home'
import UserPage from '../views/UserPage'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/userpage',
        name: 'UserPage',
        component: UserPage
    },
    {
        path: '/login',
        redirect:  'http://localhost:8010/login'
           // return '/redirecting' // not important since redirecting
        //}
        //beforeEnter(to, from, next) {
        //    // Put the full page URL including the protocol http(s) below
        //    window.location.replace("http://localhost:8010/login")
        //}
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: PageNotFound
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;