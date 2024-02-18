
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/content'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  content: {
    // Configuring code highlighting
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: 'github-dark',
      // Define languages you expect to use
      preload: ['java', 'javascript', 'python']
    },
    markdown: {
      // Configuring external link processing
      // https://github.com/rehypejs/rehype-external-links
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: 'noopener noreferer'
          }
        ]
      ]
    }
  }
})
