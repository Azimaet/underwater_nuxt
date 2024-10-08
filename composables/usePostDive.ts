import { useAlertsStore } from "~/stores/alerts";
import { useUserStore } from "~/stores/user";

/**
 * Post Dive Method
 * @return { Promise<void> }
 */
export async function usePostDive(): Promise<void> {
  const { $api } = useNuxtApp();
  const alertsStore = useAlertsStore();
  const userStore = useUserStore();
  const headers = useRequestHeaders(["cookie"]);

  try {
    const data = await $fetch<any>($api("/auth"), {
      headers,
      credentials: "include",
    });

    if (data?.user) {
      userStore.username = data.user.username;
      userStore.email = data.user.email;

      alertsStore.pushAlert({
        title: "Bienvenue " + data.user.username,
        type: "success",
        closable: true,
        timestamp: Date.now(),
      });

      navigateTo("/dashboard");
    }
  } catch (e) {}
}
