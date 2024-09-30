/**
 * SignUp User Method
 * @param { any } form
 * @return { Promise<void> }
 */
export async function useSignUp(form: {
  email: string | null;
  password: string | null;
  username: string | null;
}): Promise<void> {
  const { $api } = useNuxtApp();

  try {
    const { data, status, error } = await useFetch($api("/register"), {
      method: "POST",
      body: form,
      credentials: "include",
    });
  } catch (e) {}
}
