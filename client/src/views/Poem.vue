<!-- poem -->
<template>
  <div class="poem">
    <div class="head">
      <div class="head-bar"></div>
    </div>
    <div class="main"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .poem {
    width: 100vw;
    height: 100vh;
    .head {
      // position: fixed;
      width: 100%;
      height: 90px;
      .head-bar {
        margin: 0 auto;
        width: 70%;
        height: 100%;
        background-color: aquamarine;
      }
    }
  }
</style>