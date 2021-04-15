import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

import store from '../store/index';
import Home from '../views/Home.vue';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Athletes from "@/views/Athletes.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/:username/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        children: [
            {
                path: '',
                name: 'DashboardHome',
                component: () => import('../views/DashboardHome.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('../views/Profile.vue')
            },
            {
                path: 'athletes',
                name: 'Athletes',
                component: () => import('../views/Athletes.vue')
            },
            {
                path: 'athletes/:id',
                name: 'Athlete',
                component: () => import('../views/Athlete.vue')
            },
            {
                path: 'athletes/:id/table',
                name: 'Table',
                component: () => import('../views/Table.vue')
            },
            {
                path: 'athletes/:id/chart',
                name: 'Chart',
                component: () => import('../views/Chart.vue')
            },
            {
                path: 'guide',
                name: 'Guide',
                component: () => import('../views/DashboardHome.vue')
            },
            {
                path: 'ticket',
                name: 'Ticket',
                component: () => import('../views/DashboardHome.vue')
            },
            {
                path: 'docs',
                name: 'Docs',
                component: () => import('../views/Documentation.vue')
            },
        ],
        meta: {
            requiresAuth: true
        },
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.user_loggedIn) {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
})

export default router
