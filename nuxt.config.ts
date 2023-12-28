// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
  alias: {
    "styled-system": resolve("./styled-system"),
  },
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
    locales: ["en", "fr"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
  },

  css: ["@/assets/css/global.css"],

  postcss: {
    plugins: {
      "@pandacss/dev/postcss": {},
    },
  },
});
