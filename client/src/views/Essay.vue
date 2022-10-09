<!-- Essay -->
<template>
  <div class="essay flex-center">
    <div>
      <div class="search flex-center">
        <div class="logo"></div> <span>/</span>
        <input type="text" placeholder="关键词">
      </div>
      <div class="main"></div>
    </div>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .essay {
    width: calc(100vw - 20px);
    height: 100vh;
    // background-color: rgb(98, 126, 98);
    > div {
      width: 60%;
      height: 100%;
      .search {
        width: 100%;
        height: 70px;
        // background-color: rgb(67, 99, 67);
        margin: 50px auto;
        opacity: 0.9;
        .logo {
          width: 50px;
          height: 50px;
          background: url("wove3.svg") center/cover no-repeat;
          margin-right: 20px;
          cursor: pointer;
        }
        >span {
          display: inline-block;
          font: 50px/70px $fontF;
          margin-right: 20px;
        }
        input {
          font: 30px/35px $fontF;
          height: 35px;
          width: 80%;
          border: none;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            opacity: 0.3;
          }
        }
      }
      .main {
        width: 100%;
        height: 600px;
        background-color: rgb(153, 153, 95);
      }  
    }
  }

</style>