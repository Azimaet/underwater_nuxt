<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigation";
import { useUserStore } from "@/stores/user";
import { useSignUp } from "~/composables/auth/useSignUp";

const navigationStore = useNavigationStore();
const userStore = useUserStore();

const isPasswordVisible = ref(false);
const form = ref({
  email: null,
  username: null,
  password: null,
  passwordRetyped: null,
});
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

    <v-text-field
      v-model="form.email"
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :error="userStore?.fieldsErrors?.find((err) => err.field === 'email')"
      :error-messages="
        userStore?.fieldsErrors?.find((err) => err.field === 'email')?.message
      "
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis">Username</div>

    <v-text-field
      v-model="form.username"
      density="compact"
      placeholder="Username"
      prepend-inner-icon="mdi-user-outline"
      variant="outlined"
      :error="userStore?.fieldsErrors?.find((err) => err.field === 'username')"
      :error-messages="
        userStore?.fieldsErrors?.find((err) => err.field === 'username')
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
      :error="userStore?.fieldsErrors?.find((err) => err.field === 'password')"
      :error-messages="
        userStore?.fieldsErrors?.find((err) => err.field === 'password')
          ?.message
      "
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>

    <v-text-field
      v-model="form.password"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="isPasswordVisible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      :error="userStore?.fieldsErrors?.find((err) => err.field === 'password')"
      :error-messages="
        userStore?.fieldsErrors?.find((err) => err.field === 'password')
          ?.message
      "
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>

    <v-btn
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      block
      @click="useSignUp(form)"
    >
      Sign Up
    </v-btn>
  </v-card>
</template>
