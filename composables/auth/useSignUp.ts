import { useAlertsStore } from "~/stores/alerts";
import { useErrorsDispatcher } from "@/composables/helpers/useErrorsDispatcher";

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

  alertsStore.resetFieldsErrors();

  if (form.password !== form.passwordVerify) {
    useErrorsDispatcher([
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
    ]);

    return;
  }

  try {
    await $fetch($api("/register"), {
      method: "POST",
      body: form,
      credentials: "include",
    });

    alertsStore.pushAlert("success", "Votre compte a bien été créé.");
  } catch (err: any) {
    console.log(err.data);
    useErrorsDispatcher(err.data.messages);
  }
}
