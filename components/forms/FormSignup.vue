<script setup lang="ts">
import { useAlertsStore } from "#imports";
import { useSignUp } from "~/composables/auth/useSignUp";

const alertsStore = useAlertsStore();
const isPasswordVisible = ref(false);
const isPasswordVerifyVisible = ref(false);
const form = ref({
  email: null,
  username: null,
  password: null,
  passwordVerify: null,
});

const submitSignUp = () => {
  console.log("hello world");
  useSignUp(form.value);
};
</script>

<template>
  <v-card
    class="mx-auto pa-12 pb-8"
    elevation="8"
    max-width="100%"
    width="448"
    rounded="lg"
  >
    <div class="text-subtitle-1 text-medium-emphasis">Email</div>
    <v-form @submit.prevent="submitSignUp()">
      <v-text-field
        v-model="form.email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        :error-messages="
          alertsStore?.fieldsErrors?.find((err) => err.field === 'email')
            ?.message
        "
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Username</div>

      <v-text-field
        v-model="form.username"
        density="compact"
        placeholder="Username"
        prepend-inner-icon="mdi-user-outline"
        variant="outlined"
        :error-messages="
          alertsStore?.fieldsErrors?.find((err) => err.field === 'username')
            ?.message
        "
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
      </div>

      <v-text-field
        v-model="form.password"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        :error-messages="
          alertsStore?.fieldsErrors?.find((err) => err.field === 'password')
            ?.message
        "
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
      ></v-text-field>

      <v-text-field
        v-model="form.passwordVerify"
        :append-inner-icon="isPasswordVerifyVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVerifyVisible ? 'text' : 'password'"
        density="compact"
        placeholder="Verify your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        :error-messages="
          alertsStore?.fieldsErrors?.find(
            (err) => err.field === 'passwordVerify'
          )?.message
        "
        @click:append-inner="isPasswordVerifyVisible = !isPasswordVerifyVisible"
      ></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        type="submit"
      >
        Sign Up
      </v-btn>
    </v-form>
  </v-card>
</template>
