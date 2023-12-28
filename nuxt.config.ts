// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  alias: {
    "styled-system": resolve("./styled-system"),
  },

  css: ["@/assets/css/global.css"],

  postcss: {
    plugins: {
      "@pandacss/dev/postcss": {},
    },
  },
});
