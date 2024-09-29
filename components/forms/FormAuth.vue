<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigation";
import { useUserStore } from "@/stores/user";

const navigationStore = useNavigationStore();
const userStore = useUserStore();

const isPasswordVisible = ref(false);
const credentials = ref({
  email: null,
  password: null,
  isRememberMe: false,
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
    <div class="text-subtitle-1 text-medium-emphasis">Account</div>

    <v-text-field
      v-model="credentials.email"
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :error="userStore?.fieldsErrors?.find((err) => err.field === 'email')"
      :error-messages="
        userStore?.fieldsErrors?.find((err) => err.field === 'email')?.message
      "
    ></v-text-field>

    <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    >
      Password

      <a
        class="text-caption text-decoration-none text-blue"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Forgot login password?
      </a>
    </div>

    <v-text-field
      v-model="credentials.password"
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

    <v-checkbox
      v-model="credentials.isRememberMe"
      label="Remember Me"
      :error="
        userStore?.fieldsErrors?.find((err) => err.field === 'isRememberMe')
      "
      :error-messages="
        userStore?.fieldsErrors?.find((err) => err.field === 'isRememberMe')
          ?.message
      "
    ></v-checkbox>

    <v-btn
      text="Close"
      variant="plain"
      @click="navigationStore.toggleModalAuth('CLOSE')"
    ></v-btn>

    <v-btn
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      block
      @click="userStore.authenticate(credentials)"
    >
      Log In
    </v-btn>

    <v-card-text class="text-center">
      <a
        class="text-blue text-decoration-none"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
      </a>
    </v-card-text>
  </v-card>
</template>
