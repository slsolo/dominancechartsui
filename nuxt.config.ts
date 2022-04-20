import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiHost: process.env.API_HOST || 'http://localhost:4000/'
    }
  }
})
