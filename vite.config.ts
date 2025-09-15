import path from 'path';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import UnplugInIcons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import vueDevTools from 'vite-plugin-vue-devtools';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        base: env.VITE_ROUTER_MODE === 'hash' ? '' : '/',
        plugins: [
            vue(),
            vueDevTools(),
            // Creates a custom SSL certificate valid for the local machine.
            // Using this plugin requires admin rights on the first dev-mode launch.
            // https://www.npmjs.com/package/vite-plugin-mkcert
            process.env.HTTPS ? mkcert() : undefined,
            tailwindcss(),
            AutoImport({
                include: [/\.[tj]sx?$/, /\.vue\??/],
                imports: [
                    'vue',
                    'vue-router',
                    '@vueuse/core',
                    {
                        vue: ['createVNode', 'render'],
                        'vue-router': [
                            'createRouter',
                            'createWebHistory',
                            'createWebHashHistory',
                            'useRouter',
                            'useRoute'
                        ],
                        // 全局使用 _.xxxx()
                        'lodash-es': [
                            // default imports
                            ['*', '_'] // import { * as _ } from 'lodash-es',
                        ]
                    },
                    {
                        from: 'vue-router',
                        imports: [
                            'RouteRecordRaw',
                            'RouteLocationRaw',
                            'LocationQuery',
                            'RouteParams',
                            'RouteLocationNormalizedLoaded',
                            'RouteRecordName',
                            'NavigationGuard'
                        ],
                        type: true
                    }
                ]
            }),
            Components({
                directoryAsNamespace: true,
                collapseSamePrefixes: true,
                resolvers: [
                    IconsResolver({
                        prefix: 'Icon'
                    })
                    // ElementPlusResolver({
                    //     importStyle: 'sass'
                    // })
                ]
            }),
            // Auto use Iconify icon
            UnplugInIcons({
                autoInstall: true,
                compiler: 'vue3',
                scale: 1.2,
                defaultStyle: '',
                defaultClass: 'unplugin-icon'
            })
        ],
        // esbuild: {
        //     drop: ['console', 'debugger']
        // },
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, 'src')
                }
            ]
        },
        test: {
            globals: true,
            dir: '__tests__',
            environment: 'jsdom',
            alias: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, 'src')
                }
            ]
        },
        publicDir: './public',
        server: {
            port: parseInt(env.VITE_PORT) || 5173,
            // Exposes your dev server and makes it accessible for the devices in the same network.
            host: true
        }
    };
});
