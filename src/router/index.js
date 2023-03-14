import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store";


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: function () {
            return import('../views/MainPage.vue');
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: function () {
            return import('../views/LoginForm.vue');
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user');
    if (user) store.commit('setUser', JSON.parse(user));
    const {user: currentUser} = store.state;
    if (!currentUser && to.name !== 'Login') next({name: 'Login'});
    else next();
});
export default router;
