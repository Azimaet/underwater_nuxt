<script setup lang="ts">
import { useAlertsStore } from "@/stores/alerts";

const store = useAlertsStore();
</script>

<template>
  <ul :class="['position-fixed', 'right-0', 'bottom-0']">
    <Alert
      v-for="alert in store.alertsBucket"
      :alert="alert"
      :key="alert.timestamp"
    />
  </ul>
</template>

<style lang="scss"></style>
