import type { IDive } from "~/types/Dive";
import { useAlertsStore } from "~/stores/alerts";
import { useUserStore } from "~/stores/user";

/**
 * Post Dive Method
 * @return { Promise<void> }
 */
export async function usePostDive(dive: IDive): Promise<void> {
  const { $api } = useNuxtApp();
  const alertsStore = useAlertsStore();
  const userStore = useUserStore();
  const headers = useRequestHeaders(["cookie"]);

  try {
    await $fetch($api("/dive/add"), {
      headers,
      method: "POST",
      body: dive,
      credentials: "include",
    });

    alertsStore.pushAlert({
      title: "La plongée a été enregistrée.",
      type: "success",
      closable: true,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    if (error?.statusCode === 422) {
      alertsStore.fieldsErrors = error.data.errors;
    }

    alertsStore.pushAlert({
      title: "Erreur",
      text: "Une erreur s'est produite, et la plongée n'a pas été enregistrée. Veuillez contacter un administrateur",
      type: "error",
      closable: true,
      timestamp: Date.now(),
    });
  }
}
