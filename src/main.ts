import {createApp} from 'vue';
import './assets/styles/index.css';
import App from './App.vue';
import {setupRouter} from './router';
import {init} from '@telegram-apps/sdk-vue'
import {setupEruda} from '@/plugins/eruda.ts'

const app = createApp(App);

// Initialize the @telegram-apps/sdk-vue package.
init();

async function bootstrap() {
    // load plugins
    setupEruda()
    await setupRouter(app);
    app.mount('#app');
}

bootstrap();
