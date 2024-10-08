<script setup lang="ts">
import { useSignIn } from "~/composables/auth/useSignIn";
import { useNavigationStore } from "@/stores/navigation";
import type { IGasTank } from "~/types/GasTank";

const navigationStore = useNavigationStore();
const alertsStore = useAlertsStore();

const formDive = reactive({
  date: null,
  maxDepth: null,
  totalTime: null,
  gasTanks: [] as IGasTank[],
});

const addGasTank = async () => {
  formDive.gasTanks.push({
    gasMix: {
      helium: 0,
      oxygen: 21,
      nitrogen: 79,
    },
    pressureEnd: 50,
    pressureStart: 200,
  });
};
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="navigationStore.isModalDiveOpen">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="100%"
        width="1100"
        rounded="lg"
      >
        <v-form ref="form" @submit.prevent :class="['flex']">
          <v-container fluid>
            <v-row dense>
              <v-col :cols="6">
                <v-date-picker v-model="formDive.date"></v-date-picker>

                <v-text-field
                  v-model="formDive.maxDepth"
                  density="compact"
                  placeholder="Max depth"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  :error-messages="
                    alertsStore?.fieldsErrors?.find(
                      (err) => err.field === 'maxDepth'
                    )?.message
                  "
                />

                <v-text-field
                  v-model="formDive.totalTime"
                  density="compact"
                  placeholder="Total Time"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  :error-messages="
                    alertsStore?.fieldsErrors?.find(
                      (err) => err.field === 'totalTime'
                    )?.message
                  "
                />
              </v-col>
              <v-col :cols="6">
                <v-card>
                  <!-- GAS PANELS -->
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(gasTank, index) in formDive.gasTanks"
                      :key="index"
                    >
                      <v-expansion-panel-title expand-icon="mdi-menu-down">
                        Item
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-text-field
                          v-model="gasTank.pressureEnd"
                          type="number"
                          density="compact"
                          placeholder="End Dive Pressure"
                          variant="outlined"
                        />
                        <v-text-field
                          v-model="gasTank.pressureStart"
                          type="number"
                          density="compact"
                          placeholder="Start Dive Pressure"
                          variant="outlined"
                        />
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>

                  <nav>
                    <v-btn variant="outlined" @click="addGasTank">
                      Add Gas Tank
                    </v-btn>
                  </nav>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-btn
            text="Close"
            variant="plain"
            @click="navigationStore.toggleModalDive('CLOSE')"
          ></v-btn>

          <v-btn
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            type="submit"
            block
          >
            Log In
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
