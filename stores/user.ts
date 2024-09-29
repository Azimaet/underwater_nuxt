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
  const fieldsErrors = ref<any[]>([]);

  /* Getters */
  const isAuth = computed(() => !!email.value);

  /* Actions */
  /**
   * Reset Errors
   * @return { void }
   */
  function resetFieldsErrors(): void {
    fieldsErrors.value = [];
  }
  /**
   * Authenticate User Method
   * @param { any } credentials
   * @return { Promise<void> }
   */
  async function authenticate(credentials: {
    email: string | null;
    password: string | null;
    isRememberMe: boolean | null;
  }): Promise<void> {
    resetFieldsErrors();

    try {
      const { data, status, error } = await useFetch<ILoginResponse>(
        $api("/login"),
        {
          method: "POST",
          body: credentials,
          credentials: "include",
        }
      );

      if (data?.value?.user) {
        username.value = data.value.user.username;
        email.value = data.value.user.email;

        alertsStore.pushAlert({
          title: "Bienvenue " + username.value,
          type: "success",
          closable: true,
          timestamp: Date.now(),
        });

        navigationStore.toggleModalAuth("CLOSE");
      } else if (
        error?.value?.statusCode === 422 &&
        status?.value === "error"
      ) {
        fieldsErrors.value = error?.value?.data?.errors;
      } else if (
        error?.value?.statusCode === 400 &&
        status?.value === "error"
      ) {
        let errMsg = "";
        alertsStore.pushAlert({
          title: "Erreur",
          text: error?.value?.data?.errors
            .map((err: any) => err.message)
            .join(", "),
          type: "error",
          closable: true,
          timestamp: Date.now(),
        });
      } else {
        alertsStore.pushAlert({
          title: "Erreur",
          text: "Veuillez contacter un administrateur",
          type: "error",
          closable: true,
          timestamp: Date.now(),
        });
      }
    } catch (e) {
      alertsStore.pushAlert({
        title: "Erreur",
        text: "Veuillez contacter un administrateur",
        type: "error",
        closable: true,
        timestamp: Date.now(),
      });
    }
  }

  return {
    username,
    email,
    isAuth,
    authenticate,
    fieldsErrors,
    resetFieldsErrors,
  };
});
