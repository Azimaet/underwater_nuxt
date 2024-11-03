import type { ILoginResponse } from "~/types/api/Login";
import { useAlertsStore } from "~/stores/alerts";
import { useNavigationStore } from "~/stores/navigation";
import { useUserStore } from "~/stores/user";

/**
 * Sign In User Method
 * @param { any } credentials
 * @return { Promise<void> }
 */
export async function useSignIn(credentials: {
  email: string | null;
  password: string | null;
  isRememberMe: boolean | null;
}): Promise<void> {
  const { $api } = useNuxtApp();
  const alertsStore = useAlertsStore();
  const navigationStore = useNavigationStore();
  const userStore = useUserStore();

  alertsStore.resetFieldsErrors();

  try {
    const { data, status, error } = await useFetch<ILoginResponse>(
      $api("/login"),
      {
        method: "POST",
        body: credentials,
        credentials: "include",
      }
    );

    const errors = error?.value?.data?.errors;

    if (errors && errors.length > 0) {
      if (errors[0]?.message && !errors[0]?.field) {
        alertsStore.pushAlert("error", errors[0].message);
      } else if (errors[0]?.field) {
        alertsStore.fieldsErrors = errors;
      }

      return;
    }

    if (data?.value?.user) {
      userStore.username = data.value.user.username;
      userStore.email = data.value.user.email;

      alertsStore.pushAlert("success", "Bienvenue " + data.value.user.username);

      navigationStore.toggleModalAuth("CLOSE");

      navigateTo("/dashboard");
    }
  } catch (e) {
    alertsStore.pushAlert("error", "Connexion impossible.");
  }
}
