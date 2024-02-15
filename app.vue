<script setup lang="ts">
const router = useRouter()

const nav = [
  { label: 'Home', to: '/' },
]
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6" md="6">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </v-col>
  </v-row>
</template>


