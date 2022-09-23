<script setup lang="ts">
  import { reactive, Ref, ref } from 'vue';
  interface IMenuList  {
    txt: string
  }
  let indexLeftMode: Ref<number> = ref(1)
  let menuList: Array<IMenuList> = reactive([
    {txt: "诗"},
    {txt: "乐"},
    {txt: "记"}
  ])
  let mainList: any = reactive([
    {title:"海风", content: "xxxxx"},
    {title:"你是雾我是酒馆", content: "xxxxx"},
    {title:"typescript", content: "xxxxx"}
  ])
  function changeLeftMode (mode: number) {
    let tim = 0, inv = 800
    /* 此处有问题 */
    return function () {
      if (mode) {
        console.log("leave ---", tim)
        clearInterval(tim)
        indexLeftMode.value=mode
      } else {
        tim = setTimeout(()=>{indexLeftMode.value=mode}, inv)
        console.log("enter ---",tim)
      }
    }
  }
</script>

<template>
  <div class="index">
    <div class="index-left flex-center" @mouseenter="changeLeftMode(0)" @mouseleave="changeLeftMode(1)">
      <div class="logo" v-if="indexLeftMode">
        <div class="logo-pic"></div>
        <div class="logo-wave absolute-center"></div>
      </div>
      <ul class="menu" v-else>
        <li v-for="(v,i) in menuList" :key="i">{{v.txt}}</li>
      </ul>
    </div>
    <div class="index-right flex-center">
      <ul class="main flex-col-ycenter">
        <li v-for="(v,i) in mainList" :key="i">
          <div class="main-cate">{{menuList[i].txt}}</div>
          <div class="main-title">{{v.title}}</div>
          <div class="main-content">{{v.content}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .index {
    width: 100vw;
    height: 100vh;
    display: flex;
    // background-color: $mainColor;
    .index-left {
      width: 33vw;
      height: 100%;
      // background-color: red;
      &:hover {
        .logo-pic {animation: fadeOut linear 0.8s forwards;}
        .logo-wave {animation: wave linear 0.8s forwards;}
      } 
      .logo {
        width: 11vw;
        height: 11vw;
        position: relative;
        .logo-pic {
          width: 100%;
          height: 100%;
          background: url("wove.svg");
          opacity: 0.7;
          filter: invert(100%);
        }
        .logo-wave {
          width: 11vw;
          height: 11vw;
          border: 1px solid black;
          border-radius: 50%;
          opacity: 0;
        }
      }
      .menu {
        width: 50%;
        height: 33%;
        // background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        li {
          width: 10rem;
          text-align: center;
          // background-color: green;
          font: 2rem/3rem $fontF;
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
    .index-right {
      flex: 1;
      height: 100%;
      // background-color: green;
      flex-direction: column;
      .main {
        // background-color: yellow;
        li {
          height: 19rem;
          .main-cate {
            font: bold 1.5rem/5rem $fontF;
            opacity: 0.2;
          }
        }
      }
    }
  }
  @keyframes wave {
    0% {transform: translate(-50%,-50%) scale(1);opacity: 0;}
    20% {transform: translate(-50%,-50%) scale(1.6);opacity: 0.5;}
    100% {transform: translate(-50%,-50%) scale(3);opacity: 0;}
  }
  @keyframes fadeOut {
    0% {opacity: 0.7;}
    100% {opacity: 0;}
  }
</style>
