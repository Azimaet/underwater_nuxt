<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useNavigationStore } from "@/stores/navigation";
import { useLogout } from "~/composables/auth/useLogout";
import { useMenu } from "@/composables/useMenu";

const userStore = useUserStore();
const navigationStore = useNavigationStore();

const { menu } = useMenu();
</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <LogoType class="me-4" />

      <v-btn
        v-for="(link, index) in menu"
        :key="index"
        :to="link.path"
        variant="text"
      >
        {{ link.name }}
      </v-btn>

      <v-spacer></v-spacer>

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
          <v-btn color="error" :size="'default'" @click="useLogout()">
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
    </v-container>
  </v-app-bar>
</template>
