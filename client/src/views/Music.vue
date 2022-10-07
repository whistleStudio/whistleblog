<!-- music -->
<template>
  <div class="music">
    <div class="left flex-center">
      <div class="left-box">
        <ul v-if="rotateDegs.length===25">
          <li class="flex-center" :class="{logo: i===12, playing: i===12&&isPlay}" v-for="(v, i) in musicList" :key="i" @click="logoClick(i)" :style="{backgroundImage: i===12&&isPlay?`url(${actMusic.imgUrl})`:''}">
            <span v-if="i!==12" 
            @click="leftTitleClick(v)" :class="{active: v===actMusic.title}" :style="{transform: `rotate(${rotateDegs[i]}deg)`}">{{v}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right flex-center">
      <div class="song flex-col-ycenter">
        <div class="song-info"><span>{{actMusic.title}}</span><span>&nbsp;&nbsp;-&nbsp;&nbsp;{{actMusic.singer}}</span></div>
        <audio ref="musicAudio" :src="actMusic.src" controls autoplay @play="isPlay=true" @pause="isPlay=false"></audio>
        <div class="song-lyric">{{actMusic.lyric}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive, Ref, ref } from 'vue';
  import router from "@/router"

  interface IMusicInfo {
    title: string,
    singer: string,
    lyric: string,
    src: string,
    imgUrl: string,
    [name:string]: string
  }
  // let musicAudio: Ref<HTMLAudioElement> | Ref<null> = ref(null) 
  let musicAudio = ref<any>(null)
  let rotateDegs: Ref<number[]> = ref([]), isPlay = ref(false)
  let musicList: Ref<string[]> = ref([])
  let actMusic: IMusicInfo = reactive({
    title: "", singer: "", lyric: "", src: "", imgUrl: ""
  })

  /* 左区点击歌名 */
  function leftTitleClick (v: string) {
    actMusic.title = v
    getActMusicInfo(v)
    // setTimeout(()=>{musicAudio?.value?.play()}, 500)
  }
  /* 回到主页 */  
  function logoClick (i: number) {
    if (i === 12) router.push("/")
  }
  function musicPlay (){
    console.log("plua")
  }
  /* 请求播放歌曲详细信息 */
  function getActMusicInfo (actTitle: string) {
    fetch (`/api/music/getActMusicInfo?actTitle=${actTitle}`)
    .then(res => res.json()
    .then(data => {
      if (!data.err) {
        console.log(data)
        Object.keys(data.actMusicInfo).forEach(e => {
          actMusic[e] = data.actMusicInfo[e]
        })
      } else alert(data.msg)
    }))
  }
  /* ---------------------------------- */
  onBeforeMount(() => {
    for (let v of Array(25)) {
      rotateDegs.value.push(Math.random()*360)
    }
    fetch ("/api/music/getMusicList")
    .then(res => res.json()
    .then(data => {
      if (!data.err) {
        // 随机排序
        let rdList: string[] = []
        let mcList: string[] = data.musicList
        for (let v of Array(25)) {
          let rdIdx: number = Math.floor(Math.random()*mcList.length)
          rdList.push(...mcList.splice(rdIdx,1))
        }
        musicList.value = rdList
        actMusic.title = rdList[Math.floor(Math.random()*25)]
        getActMusicInfo(actMusic.title)
      } else {
        alert(data.msg)
      }
    }))
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
            background: url("wove3.svg") center/contain no-repeat;
            cursor: pointer;
            opacity: 0.9;
            z-index: 2;
            border-radius: 50%;
            &:hover {
              background: center/cover no-repeat;
              background-image: url("wove3.svg") !important;
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