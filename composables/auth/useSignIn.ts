import type { ILoginResponse } from "~/types/api/Login";
import { useAlertsStore } from "~/stores/alerts";
import { useErrorsDispatcher } from "@/composables/helpers/useErrorsDispatcher";
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
    const { user } = await $fetch<ILoginResponse>($api("/login"), {
      method: "POST",
      body: credentials,
      credentials: "include",
    });

    userStore.username = user.username;
    userStore.email = user.email;

    alertsStore.pushAlert("success", "Bienvenue " + user.username);

    navigationStore.toggleModalAuth("CLOSE");

    navigateTo("/dashboard");
  } catch (err: any) {
    useErrorsDispatcher(err.data.errors);
  }
}
