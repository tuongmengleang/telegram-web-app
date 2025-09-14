import type { App } from 'vue';
import routes from './routes';

const history =
    import.meta.env.VITE_ROUTER_MODE === 'hash'
        ? createWebHashHistory()
        : createWebHistory();

const router = createRouter({
    history,
    routes
});

export async function setupRouter(app: App) {
    app.use(router);

    await router.isReady();
}

export default router;
