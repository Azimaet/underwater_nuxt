import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuth } = useUserStore();

  if (isAuth) return navigateTo("/dashboard");
});
