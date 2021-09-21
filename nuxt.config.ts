import * as path from 'path'
import * as fs from 'fs'
import { NuxtConfig } from "@nuxt/types"
import * as FontAwesome from './buildModules/fontawesome'

const config: NuxtConfig = {
  server: {
    host: '0.0.0.0',
    port: 8080, // デフォルト: 3000
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem"))
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cheese',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'いつでも、どこでも、誰とでも、みんなで記念写真を' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/reset'],

  scss: ['~assets/vars/*.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/composition-api'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }],
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // '@nuxt/image',
    "vue-web-cam/nuxt"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  styleResources: {
    scss: ['~assets/vars/*.scss'],
    hoistUseStatements: true
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    config: {}
  },

  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
      regular: FontAwesome.regular,
      brands: FontAwesome.brands
    }
  },

  moment: {
    locales: ['ja']
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },

  // image: {
  //   domains: [
  //     'dmc-cheese.imgix.net'
  //   ],
  //   imgix: {
  //     baseURL: 'https://dmc-cheese.imgix.net'
  //   }
  // }
}

module.exports = config;
