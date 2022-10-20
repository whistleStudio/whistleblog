<template>
  <div class="index">
    <div class="index-left flex-center" @mouseenter="changeLeftMode(0)" @mouseleave="changeLeftMode(1)">
      <div class="logo" v-if="indexLeftMode">
        <div class="logo-pic"></div>
        <div class="logo-wave absolute-center"></div>
      </div>
      <ul class="menu" v-else>
        <li class="menu-li" :class="{'menu-fade': menuMode}" v-for="(v,i) in menuList" :key="i" @click="menuClick(i)">{{v.txt}}</li>
        <li class="absolute-center" :class="{'menu-wave': menuMode}"></li>
      </ul>
    </div>
    <div class="index-right flex-center">
      <ul class="main flex-col-ycenter">
        <li  v-for="(k,i) in Object.keys(mainList)" :key="i">
          <div class="main-cate">{{menuList[i].txt}}</div>
          <div class="main-title">{{mainList[k].title}}</div>
          <div v-if="i!==1" class="main-content">{{mainList[k].content}}</div>
          <div v-else>
            <audio ref="idxAudio" controls :src="mainList[k].src" volume="0.6"></audio>
          </div>
        </li>
      </ul>
    </div>
    <div class="icp"><a href="https://beian.miit.gov.cn/#/Integrated/index">备案号|苏ICP备19068688号-1</a></div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, Ref, ref, onMounted, onBeforeMount } from 'vue';
  import router from "@/router"
  interface IMenuList  {
    txt: string,
    link: string
  }
  let indexLeftMode = ref<number>(1), menuMode = ref(false)
  let tim1 = ref<ReturnType <typeof setTimeout>>(), tim2 =ref<ReturnType <typeof setTimeout>>()
  let idxAudio = ref<any>(null)
  let menuList: Array<IMenuList> = reactive([
    {txt: "诗", link: "/poem"},
    {txt: "乐", link: "/music"},
    {txt: "记", link: "/essay"}
  ])
  let mainList = ref<any>({})

  /* 左边动效展示 */
  function changeLeftMode (mode: number) {
    let inv = 705
    if (mode) {
      // leave
      clearInterval(tim1.value)
      tim2.value = setTimeout(()=>{indexLeftMode.value=mode}, inv)
      menuMode.value = true
    } else {
      // enter
      clearInterval(tim2.value)
      tim1.value = setTimeout(()=>{indexLeftMode.value=mode}, inv)
      menuMode.value = false
    }
  }
  /* 路由跳转 */
  function menuClick (i: number) {
    router.push(menuList[i].link)
  }

  /* ------------------------------------- */
  onBeforeMount(() => {
    fetch(`/api/home/getHomeData`)
    .then(res => res.json()
    .then(data => {
      mainList.value = data.homeData
    }))
  })

  onMounted(()=>{
    // 只在首次打开时，生效
    if (sessionStorage.getItem("canBgmPlay") === "yes") {
      document.addEventListener("click", musicAutoPlay)
      sessionStorage.setItem("canBgmPlay", "no")
    }
    function musicAutoPlay () {
      idxAudio?.value[0]?.play()
      document.removeEventListener("click", musicAutoPlay)
    }
  })
</script>

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
        .logo-pic {animation: fadeOut linear 0.7s forwards;}
        .logo-wave {animation: wave linear 0.7s forwards;}
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
        position: relative;
        .menu-li {
          width: 10rem;
          text-align: center;
          // background-color: green;
          font: 2rem/3rem $fontF;
          cursor: pointer;
          opacity: 0.7;
          z-index: 2;
          &:hover {
            opacity: 1;
            font-weight: bold;
          }
          &.menu-fade {
            animation: fadeOut linear 0.7s forwards;
          }
        }
        li:last-of-type {
          width: 19rem;
          height: 19rem;
          border: 1px solid black;
          border-radius: 50%;
          opacity: 0;
          &.menu-wave {
            animation: wave linear 0.7s forwards;
          }
        }
      }
    }
    .index-right {
      flex: 1;
      height: 100%;
      // background-color: green;
      flex-direction: column;
      .main {
        li {
          max-width: 600px;
          height: 19rem;
          // background-color: olive;
          overflow: hidden;
          &:last-of-type {
            .main-content{text-align: left;}
          }
          .main-cate {
            font: bold 1.8rem/5rem $fontF;
            opacity: 0.2;
          }
          .main-title {
            font: 1.3rem/3rem $fontF;
          }
          .main-content {
            white-space:pre-line;
            line-height: 1.5rem;
            font-size: 0.9rem;
            opacity: 0.85;
          }
          audio {
            margin-top: 0.85rem;
            height: 2rem;
            opacity: 0.85;
          }
        }
      }
    }
    .icp {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      >a {
        color: white;
        cursor: pointer;
        &:hover {
          color: rgb(240,240,240);
        }
      }
      // color: white;
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
