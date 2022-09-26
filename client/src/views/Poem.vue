<!-- poem -->
<template>
  <div class="poem">
    <div class="head">
      <div class="head-bar">
        <div class="logo" @click="logoClick"></div>
        <ul>
          <li>哨子</li>
          <li>子秋</li>
          <li>⬅关于</li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="cate">
        <ul>
          <li>2022</li>
        </ul>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from "@/router"

  function logoClick () {
    router.push("/")
  }
</script>

<style scoped lang="scss">
  .poem {
    width: 100vw;
    height: 100vh;
    .head {
      width: 100%;
      height: 90px;
      position: fixed;
      background-color: white;
      .head-bar {
        margin: 0 auto;
        width: 55%;
        height: 100%;
        // background-color: aquamarine;
        display: flex;
        align-items: center;
        .logo {
          width: 40px;
          height: 40px;
          background: url("wove.svg");
          opacity: 0.75;
          border: 2px solid white;
          border-radius: 50%;
          filter: invert(100%);
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
        >ul {
          display: flex;
          margin-left: auto;
          // background-color: yellow;
          li {
            margin-left: 50px;
            font: 17px/90px $fontF;
            opacity: 0.85;
            cursor: pointer;
            &:hover {
              opacity: 1;
              font-weight: bold;
            }
          }
        }
      }
    }
    .main {
      box-sizing: border-box;
      width: 55%;
      height: 100%;
      padding-top: 90px;
      background-color: yellow;
      margin: 0 auto;
      .cate {
        width: 300px;
        height: 100%;
        background-color: green;
        display: flex;
        align-items: center;
        ul {
          li {
            font: 25px/30px $fontF;
          }
        }
      }
    }
  }
</style>