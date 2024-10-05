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

    alertsStore.pushAlert({
      title: "L'utilisateur a bien été créé.",
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
      text: "Une erreur s'est produite, et l'utilisateur n'a pas été créé. Veuillez contacter un administrateur",
      type: "error",
      closable: true,
      timestamp: Date.now(),
    });
  }
}
