<script setup lang="ts">
import { useAlertsStore } from "@/stores/alerts";

const store = useAlertsStore();
</script>

<template>
  <ul>
    <Alert
      v-for="alert in store.bucket"
      :alert="alert"
      :key="alert.timestamp"
    />
  </ul>
</template>

<style lang="scss"></style>
