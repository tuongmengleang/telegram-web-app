import path from 'path';
import {defineConfig} from 'vitest/config';
import {loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import UnplugInIcons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        base: env.VITE_ROUTER_MODE === 'hash' ? '' : '/',
        plugins: [
            vue(),
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
        esbuild: {
            drop: ['console', 'debugger']
        },
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
        server: {
            port: parseInt(env.VITE_PORT) || 5173,
        },
    };
});
