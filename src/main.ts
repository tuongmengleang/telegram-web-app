import { createApp } from 'vue';
import './assets/styles/main.css';
import './assets/styles/index.css';
import App from './App.vue';
import { setupRouter } from './router';
import { init } from './init';
import { retrieveLaunchParams } from '@telegram-apps/sdk-vue';

const app = createApp(App);

// Initialize the @telegram-apps/sdk-vue package.
init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

async function bootstrap() {
    // load plugins
    await setupRouter(app);
    app.mount('#app');
}

bootstrap();
