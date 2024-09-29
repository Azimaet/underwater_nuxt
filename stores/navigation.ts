import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "~/stores/user";

export const useNavigationStore = defineStore("navigation", () => {
  /* Inits */
  const userStore = useUserStore();

  /* State */
  const isMenuOpen = ref<boolean>(false);
  const isModalAuthOpen = ref<boolean>(false);
  const isMobile = ref<boolean>(useIsMobile());

  /* Actions */
  /**
   * Toggle the mobile menu open/close state
   * @param { 'OPEN'|'CLOSE'| null } action
   * @return { void }
   */
  function toggleMenu(action: "OPEN" | "CLOSE" | null = null): void {
    if (!action) isMenuOpen.value = !isMenuOpen.value;

    isMenuOpen.value = action === "OPEN" ? true : false;
  }

  /**
   * Toggle themodal Login open/close state
   * @param { 'OPEN'|'CLOSE'| null } action
   * @return { void }
   */
  function toggleModalAuth(action: "OPEN" | "CLOSE" | null = null): void {
    userStore.resetFieldsErrors();
    if (!action) isModalAuthOpen.value = !isModalAuthOpen.value;

    isModalAuthOpen.value = action === "OPEN" ? true : false;
  }

  /**
   * Determines if the device is mobile based on userAgent and screen width
   * @return { boolean }
   */
  function useIsMobile(): boolean {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator?.userAgent
      ) || window?.innerWidth < 768
    );
  }

  /* Update isMobile state on resize */
  window?.addEventListener("resize", () => {
    isMobile.value = useIsMobile();
  });

  return {
    isMenuOpen,
    isModalAuthOpen,
    toggleMenu,
    toggleModalAuth,
    isMobile,
  };
});
