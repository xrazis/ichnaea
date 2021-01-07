import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Login from "@/views/Login.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
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
            }
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
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router
