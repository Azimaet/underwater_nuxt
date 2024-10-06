<script setup lang="ts">
const { $api } = useNuxtApp();

const headers = useRequestHeaders(["cookie"]);

console.log(headers);

const { data: user } = await useFetch($api("/auth"), {
  headers,
  credentials: "include",
});

console.log(user);
</script>

<template>
  <h1>Index page</h1>

  <br />

  <FormSignup />
</template>
