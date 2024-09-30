import { useAlertsStore } from "~/stores/alerts";
import { useUserStore } from "~/stores/user";

const alertsStore = useAlertsStore();
const userStore = useUserStore();

/**
 * Logout User Method
 * @return { Promise<void> }
 */
export async function useLogout(): Promise<void> {
  const { $api } = useNuxtApp();

  try {
    const { status } = await useFetch($api("/logout"), {
      method: "POST",
    });

    if (status.value !== "success") {
      alertsStore.pushAlert({
        title: "Erreur",
        text: "La déconnexion a échoué.",
        type: "error",
        closable: true,
        timestamp: Date.now(),
      });

      return;
    }

    userStore.username = null;
    userStore.email = null;
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
