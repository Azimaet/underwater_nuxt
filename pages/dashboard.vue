<script setup lang="ts">
import { useNavigationStore } from "@/stores/navigation";

definePageMeta({
  middleware: "auth-middleware",
});

const navigationStore = useNavigationStore();

function test() {
  console.log("szsz");
}
</script>

<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list rounded="lg">
              <v-list-item
                v-for="n in 5"
                :key="n"
                :title="`List Item ${n}`"
                link
              ></v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item
                color="grey-lighten-4"
                title="Add Dive"
                @click="navigationStore.toggleModalDive('OPEN')"
              ></v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet min-height="70vh" rounded="lg">
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
