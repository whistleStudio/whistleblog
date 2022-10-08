<!-- Essay -->
<template>
  <div class="essay flex-center">
    <div>
      <div class="left">
        <div class="search"></div>
        <div class="menu"></div>
      </div>
      <div class="right"></div>
    </div>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .essay {
    width: calc(100vw - 20px);
    height: 100vh;
    background-color: rgb(98, 126, 98);
    > div {
      width: 80%;
      height: 100%;
      display: flex;  
    }
  }
  .left {
      width: 500px;
      height: 100%;
      background-color: yellowgreen;
    }
    .right {
      flex: 1;
      background-color: rgb(99, 141, 141);
    }
</style>