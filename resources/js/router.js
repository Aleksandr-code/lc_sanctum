import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('./components/Home.vue'),
        name: 'home.index',
        meta: { authHasRule: true, guest:true},
    },
    {
        path: '/get',
        component: () => import('./components/Get.vue'),
        name: 'get.index',
        meta: { authHasRule: true, guest: false },
    },
    {
        path: '/user/login',
        component: () => import('./components/Login.vue'),
        name: 'user.login',
        meta: { authHasRule: false, guest: true},
    },
    {
        path: '/user/registration',
        component: () => import('./components/Registration.vue'),
        name: 'user.registration',
        meta: { authHasRule: false, guest: true},
    },
    {
        path: '/user/personal',
        component: () => import('./components/Personal.vue'),
        name: 'user.personal',
        meta: { authHasRule: true, guest: false },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    const accessToken = localStorage.getItem('X-XSRF-TOKEN')
    if (to.meta.authHasRule && to.meta.guest){
        return true
    } else if (to.meta.authHasRule && !accessToken) {
        return {
            name: 'user.login'
        }
    } else if (!to.meta.authHasRule && accessToken){
        return {
            name: 'user.personal'
        }
    }
})

export default router
