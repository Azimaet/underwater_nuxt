<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useNavigationStore } from "@/stores/navigation";

const scrollPosition = ref(0);
const userStore = useUserStore();
const navigationStore = useNavigationStore();

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
});
</script>

<template>
  <v-app-bar :elevation="1">
    <template #prepend>
      <v-btn
        variant="plain"
        icon="$menu"
        :size="'large'"
        @click="navigationStore.toggleMenu('OPEN')"
      />
    </template>
    <v-app-bar-title>
      <LogoType />
    </v-app-bar-title>
    <template #append>
      <div :class="['d-flex', 'justify-center', 'align-center']">
        <template v-if="userStore.isAuth">
          <p
            v-html="userStore.username"
            :class="['d-none', 'd-sm-flex', 'mx-2']"
          />
          <v-badge dot color="success" :class="['mx-2']">
            <v-avatar color="info" :size="navigationStore.isMobile ? 30 : 45">
              <v-icon icon="$accountCircle" />
            </v-avatar>
          </v-badge>
          <v-btn color="error" :size="'default'">
            <!--           @click="useAuthLogout(), useAlertFactory('success', LOGOUT_ACCOUNT)"
 -->
            Logout
          </v-btn>
        </template>
        <v-btn
          v-else
          color="success"
          :size="'default'"
          @click="navigationStore.toggleModalAuth('OPEN')"
        >
          Login
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>
