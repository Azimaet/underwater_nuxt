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

    if (data?.value?.user) {
      userStore.username = data.value.user.username;
      userStore.email = data.value.user.email;

      alertsStore.pushAlert("success", "Bienvenue " + data.value.user.username);

      navigationStore.toggleModalAuth("CLOSE");

      navigateTo("/dashboard");
    } else if (error?.value?.statusCode === 422 && status?.value === "error") {
      alertsStore.fieldsErrors = error?.value?.data?.errors;
    } else if (error?.value?.statusCode === 400 && status?.value === "error") {
      alertsStore.pushAlert("error", "response.message");
    } else {
      alertsStore.pushAlert("error", "response.message");
    }
  } catch (e) {
    alertsStore.pushAlert("error", "response.message");
  }
}
