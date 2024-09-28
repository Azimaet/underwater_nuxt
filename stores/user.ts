import type { ILoginResponse } from "~/types/api/Login";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlertsStore } from "~/stores/alerts";

export const useUserStore = defineStore("user", () => {
  const { $api } = useNuxtApp();
  const alertsStore = useAlertsStore();

  /* State */
  const username = ref<string | null>(null);
  const email = ref<string | null>(null);

  /* Getters */
  const isAuth = computed(() => !!email.value);

  /* Actions */
  /**
   * Authenticate User Method
   * @param { any } credentials
   * @return { Promise<void> }
   */
  async function authenticate(credentials: {
    email: string;
    password: string;
    isRememberMe: boolean;
  }): Promise<void> {
    try {
      const { data } = await useFetch<ILoginResponse>($api("/login"), {
        method: "POST",
        body: credentials,
        credentials: "include",
      });

      if (!data?.value?.user) return;

      username.value = data.value.user.username;
      email.value = data.value.user.email;

      alertsStore.pushAlert({
        title: "Bienvenue " + username.value,
        type: "success",
        closable: true,
        timestamp: Date.now(),
      });
    } catch (e) {
      alertsStore.pushAlert({
        title: "Erreur",
        text: "e",
        type: "error",
        closable: true,
        timestamp: Date.now(),
      });
    }
  }

  return { username, email, isAuth, authenticate };
});
