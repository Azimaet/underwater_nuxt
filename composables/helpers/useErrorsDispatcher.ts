import { useAlertsStore } from "~/stores/alerts";

/**
 * Errors Dispatcher Helper (Push errors below form fields or global alerts)
 * @param { any[] } errors
 * @return { void }
 */
export function useErrorsDispatcher(errors: any[]): void {
  const alertsStore = useAlertsStore();

  alertsStore.resetFieldsErrors();

  if (!(errors && errors.length > 0)) {
    return;
  }

  if (errors[0]?.message && !errors[0]?.field) {
    alertsStore.pushAlert("error", errors[0].message);
  } else if (errors[0]?.field) {
    alertsStore.fieldsErrors = errors;
  }
}
