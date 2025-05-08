<!-- music -->
<template>
  <div class="music">
    <div class="left flex-center">
      <div class="left-box">
        <ul>
          <!-- 0-11 -->
          <li class="flex-center" v-for="(v, i) in musicList.slice(0, musicList.length/2)">
            <span  @click="leftTitleClick(v)" :class="{active: v.title===actMusic.title}" :style="{transform: `rotate(${rotateDegs[i]}deg)`}">{{v.title}}</span>
          </li>
          <li class="flex-center logo" :class="{playing: isPlay}" :style="{backgroundImage:isPlay? `url(${actMusic.imgUrl})` :''}" @click="logoClick"></li> 
          <!-- 12-23 -->
          <li class="flex-center" v-for="(v, i) in musicList.slice(12)">
            <span  @click="leftTitleClick(v)" :class="{active: v.title===actMusic.title}" :style="{transform: `rotate(${rotateDegs[i]}deg)`}">{{v.title}}</span>
          </li> 
        </ul>
      </div>
    </div>
    <div class="right flex-center">
      <div class="song flex-col-ycenter">
        <div class="song-info"><span>{{actMusic.title}}</span><span>&nbsp;&nbsp;-&nbsp;&nbsp;{{actMusic.singer}}</span></div>
        <audio class="music-audio" :src="actMusic.src" controls @play="isPlay=true" @pause="isPlay=false"
        :autoplay="bus.curSong.isPlaying" :currentTime="bus.curSong.currentTime" :volume="bus.curSong.volume"></audio>
        <div class="song-lyric">{{actMusic.lyric}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted, onBeforeUnmount, reactive, Ref, ref } from 'vue';
  import bus from '@/utils/bus';
  import { IMusic } from '@/utils/bus';
  import commonHandles from '@/utils/commonHandles';
  import router from "@/router"

  // let musicAudio: Ref<HTMLAudioElement> | Ref<null> = ref(null) 
  let rotateDegs: Ref<number[]> = ref([]), isPlay = ref(false)
  let musicList: Ref<IMusic[]> = ref([])
  let actMusic: IMusic = reactive({ title: "", singer: "", lyric: "", src: "", imgUrl: "", favor: 1 })

  /* 左区点击歌名 */
  function leftTitleClick (v: IMusic) {
    let findIdx = bus.playlist.findIndex((item: IMusic) => item.title === v.title && item.singer === v.singer)
    console.log(findIdx)
    if (findIdx < 0) return
    bus.curSong.idx = findIdx
    bus.curSong.isPlaying = true
    isPlay.value = true
    updateMusicView()
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
  $leftBoxLen: 800px;
.music {
  width: calc(100vw - 20px);
  height: 100vh;
  // background-color: bisque;
  .left {
    width: 50%;
    height: 100%;
    min-width: calc($leftBoxLen + 50px);
    position: fixed;
    .left-box {
      width: $leftBoxLen;
      height: $leftBoxLen;
      // background-color: antiquewhite;
      >ul {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(5,20%);
        grid-template-rows: repeat(5,20%);
        >li {
          box-sizing: border-box;
          // border: 1px solid gray;
          &.logo {
            background: url("/wove3.svg") center/contain no-repeat;
            cursor: pointer;
            opacity: 0.9;
            z-index: 2;
            border-radius: 50%;
            &:hover {
              background: center/cover no-repeat;
              background-image: url("/wove3.svg") !important;
              opacity: 0.6;
            }
            &.playing {
              animation: playMusic 20s linear infinite;
            }
            @keyframes playMusic {
              0% {transform: rotate(0deg);} 50% {transform: rotate(180deg);} 100% {transform: rotate(360deg);}
            }
          }
          >span {
            display: inline-block;
            // line-height: calc($leftBoxLen / 5);
            opacity: 0.3;
            font-size: 19px;
            cursor: pointer;
            &:hover {
              opacity: 0.6;
            }
            &.active {
              opacity: 0.8;
              font-weight: bold;
              transform: rotate(0deg) !important;
            }
          }
        }
      }
    }
  }
  .right {
    float: right;
    width: 50%;
    height: 100%;
    .song {
      width: 80%;
      height: 80%;
      // background-color: yellow;
      .song-info {
        >span {
          line-height: 80px;
          &:first-of-type {
            font-size: 24px;
            opacity: 0.9;
          }
          &:last-of-type {
            font-size: 14px;
            opacity: 0.9;
          }
        }
      }
      >audio {
        flex: none;
        display: block;
        height: 30px;
        opacity: 0.5;
        margin-bottom: 20px;
        &:hover {
          opacity: 0.9;
        }
        // &::after {
        //   display: block;
        //   content: "xxx";
        //   height: 50px;
        //   background-color: red;
        // }
      }
      .song-lyric {
        white-space: pre-line;
        font: 14px/40px $fontF;
        &::after {
          display: block;
          content: "";
          height: 50px;
        }
      }
    }
  }
}
</style>