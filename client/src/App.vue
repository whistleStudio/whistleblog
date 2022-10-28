<script setup lang="ts">
  import { computed, onBeforeMount } from 'vue';

  const isMobilePhone = computed(() => {
    const ua = navigator.userAgent.toLowerCase();
    const t1 = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua);
    return t1 ;
  })

  onBeforeMount(() => {
    if (isMobilePhone.value) window.location.href="https://mblog.whistlestudio.cn/"
    sessionStorage.setItem("canBgmPlay", "yes")
  })
</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss">
</style>
