import type { ILoginResponse } from "~/types/api/Login";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlertsStore } from "~/stores/alerts";
import { useNavigationStore } from "~/stores/navigation";

export const useUserStore = defineStore("user", () => {
  /* Inits */
  const { $api } = useNuxtApp();
  const alertsStore = useAlertsStore();
  const navigationStore = useNavigationStore();

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
