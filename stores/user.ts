import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  /* State */
  const username = ref<string | null>(null);
  const email = ref<string | null>(null);

  /* Getters */
  const isAuth = computed(() => !!email.value);

  /* Actions */

  return {
    username,
    email,
    isAuth,
  };
});
