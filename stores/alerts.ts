import type { IAlert } from "~/types/frontend/Alert";
import type { IFieldError } from "~/types/frontend/FieldError";

export const useAlertsStore = defineStore("alerts", () => {
  /* State */
  const alertsBucket = ref([] as IAlert[]);
  const fieldsErrors = ref([] as IFieldError[]);

  /* Actions */
  /**
   * Reset Errors
   * @return { void }
   */
  function resetFieldsErrors(): void {
    fieldsErrors.value = [];
  }

  /**
   * Push Alert Method
   * @param { IAlert } alert
   * @return { void }
   */
  function pushAlert(alert: IAlert): void {
    alertsBucket.value.push(alert);

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
    const alert = alertsBucket.value.find(
      (item: IAlert) => item.timestamp === timestamp
    );

    if (alert) {
      const index = alertsBucket.value.indexOf(alert);
      alertsBucket.value.splice(index, 1);
    }
  }

  return {
    alertsBucket,
    fieldsErrors,
    resetFieldsErrors,
    pushAlert,
    denyAlert,
  };
});
