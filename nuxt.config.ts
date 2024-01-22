// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    autoImport: false,
  },
  modules: ["nuxt-primevue"],
  primevue: {
    components: {
      prefix: "V",
      include: "*",
      exclude: [],
    },
  },
});
