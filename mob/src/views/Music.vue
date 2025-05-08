<!-- music -->
<template>
  <div class="music">
    <div class="head">
      <div class="head-info flex-center">
        <div class="disk" @click="logoClick" :class="{playing: isPlay}" :style="{backgroundImage: isPlay ? `url(${actMusic.imgUrl})`:`url(/wove3.svg)`}"></div>
        <div class="song flex-col-ycenter">
          <div class="title">{{actMusic.title}}</div>
          <div class="singer">{{actMusic.singer}}</div>
        </div>
      </div>
      <audio class="music-audio" :src="actMusic.src" controls :autoplay="bus.curSong.isPlaying" :currentTime="bus.curSong.currentTime" :volume="bus.curSong.volume" 
      @play="isPlay=true" @pause="isPlay=false"></audio>
    </div>
    <div class="main" ref="main">
      <ul class="main-wrapper" :class="{active: maskMode===1, wrapFadeOut: maskMode===0}">
        <li v-for="(v, i) in musicList" :key="i" class="item flex-center" >
          <span @click="titleClick(v)" :style="{transform: `rotate(${rotateDegs[i]}deg)`}" :class="{active: actMusic.title===v.title}">{{v.title}}</span>
        </li>
      </ul>
      <div class="main-lyric" :class="{active: maskMode===1}">
        {{actMusic.lyric}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, onBeforeUnmount, onMounted, reactive, Ref, ref } from 'vue';
  import bus from '@/utils/bus';
  import { IMusic } from '@/utils/bus';
  import commonHandles from '@/utils/commonHandles';
  import router from "@/router"


  let main = ref<any>(null) 
  let rotateDegs: Ref<number[]> = ref([]), isPlay = ref(false), maskMode = ref(-1)
  let musicList: Ref<IMusic[]> = ref([])
  let actMusic: IMusic = reactive({ title: "", singer: "", lyric: "", src: "", imgUrl: "", favor: 1 })

  /* 左区点击歌名 */
  function titleClick (v: IMusic) {
    if (maskMode.value===1) {
      // getActMusicInfo(v)
      setTimeout(()=>{maskMode.value = 0},50) //延迟置0，避免main.onclick触发
      let findIdx = bus.playlist.findIndex((item: IMusic) => item.title === v.title && item.singer === v.singer)
      console.log(findIdx)
      if (findIdx < 0) return
      bus.curSong.idx = findIdx
      bus.curSong.isPlaying = true
      isPlay.value = true
      updateMusicView()
    }
  }
  /* 回到主页 */  
  function logoClick () {
    router.push("/")
  }
  // 更新页面内容
  function updateMusicView () {
    Object.keys(bus.playlist[bus.curSong.idx]).forEach(e => {
      actMusic[e] = bus.playlist[bus.curSong.idx][e];
    });
  }

  /* ---------------------------------- */
  onBeforeMount(() => {
    bus.emit("removeAppAudioEnded")
    bus.emit("muteAppMusic")
    for (let v of Array(24)) {
      rotateDegs.value.push(Math.random()*360)
    }
    // 防止当前页面刷新时, 更新view不及时用
    const tim_playlist_ok = setInterval(() => {
      if (bus.playlist.length == 24) {
        console.log("load ok")
        musicList.value = [...bus.playlist].sort(() => Math.random() - 0.5) // 随机打乱
        updateMusicView()
        clearInterval(tim_playlist_ok)
      }
    }, 10)  
  })

  onMounted(() => {
    // 显示歌曲列表
    main.value.onclick = () => {
      if (maskMode.value < 1) {
        maskMode.value = 1
        setTimeout(() => {
          maskMode.value = 0
        }, 5000)
      }
    }
    // 监听：Home audio自动播放下一首歌曲
    const audioElement = document.querySelector(".music-audio") as HTMLAudioElement
    const handleAudioEnded = () => {
      commonHandles.handleAudioEnded(audioElement)
      setTimeout(() => {
        updateMusicView()
      }, 50) 
    } 
    // 监听：Home audio自动播放下一首歌曲
    audioElement.addEventListener("ended", handleAudioEnded)
    // 监听：播放暂停事件
    audioElement.addEventListener("play", commonHandles.handleAudioPlay)
    audioElement.addEventListener("pause", commonHandles.handleAudioPause)
  })

  onBeforeUnmount(() => {
    const audioElement = document.querySelector(".music-audio") as HTMLAudioElement
    commonHandles.updateBusSongBeforeUnmount(audioElement)
  })
</script>

<style scoped lang="scss">
.music {
  // background-color: orange;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .head {
    height: 200px;
    // background-color: olive;
    .head-info {
      height: 140px;
      // background-color: pink;
      $diskW: 100px;
      .disk {
        width: $diskW;
        height: $diskW;
        background: center/contain no-repeat;
        border-radius: 50%;
        margin-right: 15px;
        opacity: 0.9;
        &:hover {
          background: url("/wove3.svg") center/contain no-repeat !important;
        }
        &.playing {
          animation: playMusic 20s linear infinite;
        }
        @keyframes playMusic {
          0% {transform: rotate(0deg);} 50% {transform: rotate(180deg);} 100% {transform: rotate(360deg);}
        }
      }
      .song {
        flex: 1;
        height: $diskW;
        // background-color: skyblue;
        justify-content: center;
        .title {
          font: 20px/50px $fontF;
          opacity: 0.8;
        }
        .singer {opacity: 0.7;}
      }
    }
    >audio {
      margin-top: 10px;
      width: 100%;
      height: 40px;
    }
  }
  .main {
    margin-top: 10px;
    width: 100%;
    position: relative;
    flex: 1;
    // background-color: rgb(105, 117, 61);
    .main-wrapper {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 150%;
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      grid-template-rows: repeat(8, 12.5%);
      opacity: 0;
      &.active {
        z-index: 2;
        opacity: 1;
      }
      &.wrapFadeOut {
        animation: fadeOut 0.5s linear forwards;
      }
      @keyframes fadeOut {
        from {opacity: 1;}
        to {opacity: 0;}
      }
      .item {
        box-sizing: border-box;
        span {
          opacity: 0.5;
          &.active {
            transform: rotate(0deg) !important;
            opacity: 0.8;
            font-weight: bold;
          }
        }
      }
    }
    .main-lyric {
      width: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      white-space: pre-line;
      font: 14px/40px $fontF;
      &.active {
        opacity: 0.1;
        z-index: 1;
      }
      &::after {
        content: "";
        display: block;
        height: 30px;
      }
    }
  }
}
</style>