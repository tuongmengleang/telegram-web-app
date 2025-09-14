import { createApp } from 'vue';
import './assets/styles/index.css';
import App from './App.vue';
import { setupRouter } from './router';

const app = createApp(App);

async function bootstrap() {
    // load plugins
    await setupRouter(app);
    app.mount('#app');
}

bootstrap();
