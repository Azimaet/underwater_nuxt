import { useUserStore } from "@/stores/user"; // Chemin vers votre store

export function useMenu() {
  const menu = computed(() => {
    const { isAuth } = useUserStore();

    return isAuth
      ? [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Account", path: "/account" },
        ]
      : [{ name: "Home", path: "/" }];
  });

  return { menu };
}
