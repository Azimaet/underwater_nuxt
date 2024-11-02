import { useAlertsStore } from "~/stores/alerts";
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

    if (status.value !== "success") {
      alertsStore.pushAlert("error", "response.message");

      return;
    }

    userStore.username = null;
    userStore.email = null;

    navigateTo("/");
  } catch (e) {
    alertsStore.pushAlert("error", "response.message");
  }
}
