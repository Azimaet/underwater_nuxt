import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuth = useUserStore().isAuth;

  if (!isAuth) return navigateTo("/");
});
