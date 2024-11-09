import { useAlertsStore } from "~/stores/alerts";
import { useErrorsDispatcher } from "@/composables/helpers/useErrorsDispatcher";
import { useUserStore } from "~/stores/user";

/**
 * Logout User Method
 * @return { Promise<void> }
 */
export async function useLogout(): Promise<void> {
  const { $api } = useNuxtApp();
  const alertsStore = useAlertsStore();
  const userStore = useUserStore();

  try {
    const { status } = await useFetch($api("/logout"), {
      method: "POST",
      credentials: "include",
    });

    if (status.value !== "success") return;

    userStore.username = null;
    userStore.email = null;
    alertsStore.pushAlert("success", "Vous êtes maintenant déconnecté.");
    navigateTo("/");
  } catch (e) {}
}
