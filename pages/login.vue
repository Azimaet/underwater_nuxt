<script setup lang="ts">
const props = defineProps<{}>();

const isLoginDialogOpen = ref(false);

const { $api } = useNuxtApp();

const credentials = ref({
  email: "john@doe.fr",
  password: "00000000",
});

// const { data: user, error } = await useFetch($api("/login"), {
//   method: "POST",
//   body: credentials.value,
// });

const { data: user, error } = await useFetch($api("/login"), {
  method: "POST",
  body: credentials.value,
});

const logout = await useFetch($api("/logout"));

console.log($api("/login"));
console.log(user);
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="isLoginDialogOpen" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps"> Open Dialog </v-btn>
      </template>

      <v-card
        prepend-icon="mdi-map-marker"
        text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
        title="Use Google's location service?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="isLoginDialogOpen = false"> Disagree </v-btn>

          <v-btn @click="isLoginDialogOpen = false"> Agree </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
