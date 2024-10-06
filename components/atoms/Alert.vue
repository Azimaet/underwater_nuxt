<script setup lang="ts">
import type { IAlert } from "~/types/frontend/Alert";
import { useAlertsStore } from "@/stores/alerts";

defineProps<{
  alert: IAlert;
}>();

const store = useAlertsStore();
const value = ref(5);
const bufferValue = ref(100);
const progressDuration = 8000;
const intervalTime = 50;
const interval: null | any = ref(null);

onMounted(() => {
  const step = (bufferValue.value / progressDuration) * intervalTime;

  interval.value = setInterval(() => {
    if (value.value < bufferValue.value) {
      value.value += step;
    } else {
      clearInterval(interval.value);
    }
  }, intervalTime);
});

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});
</script>

<template>
  <li :style="{ listStyle: 'none' }">
    <v-alert
      :text="alert.text"
      :title="alert.title"
      :type="alert.type"
      :closable="alert.closable"
      :class="'position-relative'"
      @click:close="store.denyAlert(alert.timestamp)"
    >
      <v-progress-linear
        v-model="value"
        :buffer-value="bufferValue"
        color="white"
        :class="['position-absolute', 'bottom-0', 'left-0']"
      ></v-progress-linear
    ></v-alert>
  </li>
</template>
