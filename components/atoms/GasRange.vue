<script setup lang="ts">
import type { IGasMix } from "@/types/GasMix";
import { useGasNameProvider } from "@/composables/useGasNameProvider";

const emit = defineEmits(["update:gasMix"]);
const props = defineProps<{
  gasMix: IGasMix;
}>();

const gasSelectors = ref([
  props.gasMix.oxygen,
  props.gasMix.nitrogen - props.gasMix.oxygen,
]);

const gasName = computed(() => {
  return useGasNameProvider(props.gasMix);
});

watch(gasSelectors, () => {
  handleGasValues();
});

const handleGasValues = () => {
  const newMix: IGasMix = {
    oxygen: gasSelectors.value[0],
    nitrogen: gasSelectors.value[1] - gasSelectors.value[0],
    helium: 100 - gasSelectors.value[1],
  };

  emit("update:gasMix", newMix);
};
</script>

<template>
  {{ gasName.title }} {{ gasName.subtitle }}
  <v-range-slider
    v-model="gasSelectors"
    :step="1"
    max="100"
    min="0"
    strict
    tick-size="4"
    :error="!gasName.breathable"
  >
  </v-range-slider>
  {{ "OXY: " + props.gasMix.oxygen }}
  {{ "NITR: " + props.gasMix.nitrogen }}
  {{ "HEL: " + props.gasMix.helium }}
</template>
