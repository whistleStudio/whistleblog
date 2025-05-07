<!-- Home -->
<template>
  <div class="home flex-col-ycenter">
    <div v-if="showMode" class="logo" @click="showMenu">
      <div class="logo-pic" :class="{'pic-fade-out': isLogoAni}"></div>
      <div class="logo-wave absolute-center" :class="{wave: isLogoAni}"></div>
    </div>
    <div v-else class="content">
      <ul class="main flex-col-ycenter">
        <li  v-for="(k,i) in Object.keys(mainList)" :key="i">
          <div class="main-cate" @click="toPage(menuList[i].link)">{{menuList[i].txt}}</div>
          <div v-if="i!==1" class="main-title">{{mainList[k].title}}</div> <div v-else class="main-title audio-title">{{bus.playlist[curSong.idx].title}}</div>
          <div v-if="i!==1" class="main-content">{{mainList[k].content}}</div>
          <div v-else>
            <!-- :autoplay="canBgmPlay" -->
            <audio  class="home-audio" ref="idxAudio" controls @play="disAutoPlay" autoplay
            :src="bus.playlist[curSong.idx].src" :currentTime="curSong.currentTime" :volume="curSong.volume" >
            </audio>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, onBeforeUnmount, onUnmounted, computed, watch } from 'vue';
import bus from '@/utils/bus';
import router from "@/router"

interface IMenuList  {
  txt: string,
  link: string
}

let showMode = ref<number>(1), isLogoAni = ref<boolean>(false), canBgmPlay = ref<boolean>(false), idxAudio = ref<any>(null);
let menuList: Array<IMenuList> = [
  {txt: "诗", link: "/poem"},
  {txt: "乐", link: "/music"},
  {txt: "记", link: "/essay"}
]
let mainList = ref<any>({})
const curSong = computed(() => bus.curSong)
/* 展示菜单 */
function showMenu () {
  isLogoAni.value = true
  setTimeout(() => { //等待logo动画完成
    bus.emit("muteAppMusic")
    showMode.value = 0 
  }, 600)
}
/* 页面跳转 */
function toPage (link: string) {
  router.push(link)
}
/* 禁止自动播放 */
function disAutoPlay () {
  sessionStorage.setItem("canBgmPlay", "no")
}
/* --------------------------------------------- */
onBeforeMount(() => {
  fetch(`/api/home/getHomeData`)
  .then(res => res.json()
  .then(data => {
    mainList.value = data.homeData
  }))

})
onMounted(()=>{
  //只在首次打开时，生效
  if (sessionStorage.getItem("canBgmPlay") === "yes") {
    canBgmPlay.value = true
  }
  // Home audio自动播放下一首歌曲
  
})

onBeforeUnmount(() => { 
  const audioElement = document.querySelector(".home-audio") as HTMLAudioElement
  console.log(audioElement)
  bus.curSong.currentTime = audioElement.currentTime;
  bus.curSong.volume = audioElement.volume;
  console.log("beforeHomeUnmount:", bus.curSong)
  bus.emit("playAppMusic")
});

onUnmounted(() => {
  // bus.emit("playAppMusic")
})

watch(() => bus.curSong.idx, (newVal) => {
  console.log("bus.curSong.idx:", newVal)
  // const audioElement = document.querySelector(".home-audio") as HTMLAudioElement
  // const audioTitleElement = document.querySelector(".audio-title") as HTMLAudioElement
  // audioTitleElement.innerText = bus.playlist[newVal].title
  // audioElement.src = bus.playlist[newVal].src
  // audioElement.currentTime = bus.curSong.currentTime
  // audioElement.volume = bus.curSong.volume
})

</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  justify-content: center;
  .logo {
    width: 40vw;
    height: 40vw;
    position: relative;
    opacity: 0.8;
    .logo-pic {
      width: 100%;
      height: 100%;
      background: url("/wove4.svg") center/contain no-repeat;
      &.pic-fade-out {
        animation: picFadeOut 0.6s linear forwards;
      }
      @keyframes picFadeOut {
        from {opacity: 0.8;}
        to {opacity: 0;}
      }
    }
    .logo-wave {
      width: 100%;
      height: 100%;
      border: 1px solid black;
      border-radius: 50%;
      opacity: 0;
      &.wave {
        animation: wave 0.6s linear forwards;
      }
      @keyframes wave{
        0% {transform: translate(-50%,-50%) scale(1);opacity: 0;}
        20% {transform: translate(-50%,-50%) scale(1.6);opacity: 0.5;}
        100% {transform: translate(-50%,-50%) scale(3);opacity: 0;}       
      }
    }
  }
  .content {
    // background-color: green;
    flex-direction: column;
    padding: 0 1.5rem;
    .main {
      li {
        max-width: 600px;
        margin-bottom: 3rem;
        overflow: hidden;
        &:last-of-type {
          .main-content{text-align: left;}
          margin-bottom: 0;
        }
        .main-cate {
          font: bold 1.8rem/4rem $fontF;
          opacity: 0.2;
          &:first-of-type {
            line-height: 1.8rem;
            margin-bottom: 1.1rem;
          }
        }
        .main-title {
          font: 1.3rem/2.5rem $fontF;
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
}

</style>