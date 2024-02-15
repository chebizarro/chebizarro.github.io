
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  modules: [
    'vuetify-nuxt-module'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
