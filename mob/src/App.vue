<script setup lang="ts">
  import { onBeforeMount } from 'vue';

  onBeforeMount(() => {
    sessionStorage.setItem("canBgmPlay", "yes")
  })
</script>

<template>
  <div class="app-box">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.app-box {
  width: 100vw;
  height: 100vh;
  // background-color: pink;
}
</style>
