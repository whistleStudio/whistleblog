<script setup lang="ts">
  import { onBeforeMount } from 'vue';

  onBeforeMount(() => {
    sessionStorage.setItem("canBgmPlay", "yes")
  })
</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss">
</style>
