<script setup lang="ts">
import type { IAlert } from "~/types/frontend/Alert";
import { useAlertsStore } from "@/stores/alerts";

const store = useAlertsStore();
defineProps<{
  alert: IAlert;
}>();
</script>

<template>
  <li>
    <v-alert
      :text="alert.text"
      :title="alert.title"
      :type="alert.type"
      :closable="alert.closable"
      @click:close="store.denyAlert(alert.timestamp)"
    ></v-alert>
  </li>
</template>
