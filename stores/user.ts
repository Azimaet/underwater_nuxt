import type { ILoginResponse } from "~/types/responses/Login";
import type { IUser } from "~/types/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const { $api } = useNuxtApp();

  /* State */
  const username = ref<string | null>(null);
  const email = ref<string | null>(null);

  /* Getters */

  /* Actions */
  /**
   * Authenticate User Method
   * @param { any } credentials
   * @return { Promise<void> }
   */
  async function authenticate(credentials: {
    email: string;
    password: string;
    isRememberMe: boolean;
  }): Promise<void> {
    try {
      const { data } = await useFetch<ILoginResponse>($api("/login"), {
        method: "POST",
        body: credentials,
        credentials: "include",
      });

      if (data.value?.user) {
        username.value = data.value.user.username;
        email.value = data.value.user.email;
      } else {
        console.error("No user data returned");
      }
    } catch (e) {
      console.error("Login failed:", e);
    }
  }

  return { username, email, authenticate };
});
