<script setup lang="ts">
import { useAuth } from "~/composables/auth/useAuth";

onMounted(() => {
  useAuth();
});
</script>

<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>
