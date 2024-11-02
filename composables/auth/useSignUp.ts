import { useAlertsStore } from "~/stores/alerts";

/**
 * SignUp User Method
 * @param { any } form
 * @return { Promise<void> }
 */
export async function useSignUp(form: {
  email: string | null;
  password: string | null;
  passwordVerify: string | null;
  username: string | null;
}): Promise<void> {
  const { $api } = useNuxtApp();
  const alertsStore = useAlertsStore();

  console.log("omg");

  alertsStore.resetFieldsErrors();

  if (form.password !== form.passwordVerify) {
    alertsStore.fieldsErrors = [
      {
        field: "password",
        message: "The password and passwordVerify mismatches",
        rule: "missmatch",
      },
      {
        field: "passwordVerify",
        message: "The password and passwordVerify mismatches",
        rule: "missmatch",
      },
    ];

    return;
  }

  try {
    await $fetch($api("/register"), {
      method: "POST",
      body: form,
      credentials: "include",
    });

    alertsStore.pushAlert("success", "");
  } catch (error: any) {
    if (error?.statusCode === 422) {
      alertsStore.fieldsErrors = error.data.errors;
    }

    alertsStore.pushAlert("error", "response.message");
  }
}
