import type { IAlert } from "~/types/frontend/Alert";

export const useAlertsStore = defineStore("alerts", () => {
  /* State */
  const bucket = ref([] as IAlert[]);

  /* Actions */
  /**
   * Push Alert Method
   * @param { IAlert } alert
   * @return { void }
   */
  function pushAlert(alert: IAlert): void {
    bucket.value.push(alert);

    // Set timer to auto deny alert after 8 seconds
    setTimeout(() => {
      denyAlert(alert.timestamp);
    }, 8000);
  }

  /**
   * Deny Alert Method
   * @param { number } timestamp
   * @return { void }
   */
  function denyAlert(timestamp: number): void {
    const alert = bucket.value.find(
      (item: IAlert) => item.timestamp === timestamp
    );

    if (alert) {
      const index = bucket.value.indexOf(alert);
      bucket.value.splice(index, 1);
    }
  }
  return { bucket, pushAlert, denyAlert };
});
