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
    const response = await $fetch($api("/dive/add"), {
      headers,
      method: "POST",
      body: dive,
      credentials: "include",
    });

    alertsStore.pushAlert("success", "response.message");
  } catch (error: any) {
    console.log(error);
    if (error?.statusCode === 422) {
      alertsStore.fieldsErrors = error.data.errors;
    }

    alertsStore.pushAlert("error", "");
  }
}
