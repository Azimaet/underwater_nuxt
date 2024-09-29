<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigation";

const navigationStore = useNavigationStore();
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="navigationStore.isModalAuthOpen" max-width="600">
      <FormAuth />
    </v-dialog>
  </div>
</template>
