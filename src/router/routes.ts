import { type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: 'Home Page',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/pages/index.vue')
    }
];

export default routes;
