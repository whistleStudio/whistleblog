<!-- music -->
<template>
  <div class="music">
    <div class="left flex-center">
      <div class="left-box">
        <ul v-if="rotateDegs.length===25">
          <li class="flex-center" :class="{logo: i===12, playing: i===12&&isPlay}" v-for="(v, i) in musicList" :key="i" @click="logoClick(i)" :style="{backgroundImage: i===12&&isPlay?`url(${imgUrl})`:''}">
            <span v-if="i!==12" 
            @click="leftTitleClick(v)" :class="{active: v===actTitle}" :style="{transform: `rotate(${rotateDegs[i]}deg)`}">{{v}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right flex-center">
      <div class="song flex-col-ycenter">
        <div class="song-info"><span>{{actTitle}}</span><span>&nbsp;&nbsp;-&nbsp;&nbsp;{{actSinger}}</span></div>
        <audio ref="musicAudio" :src="songUrl" controls @play="isPlay=true" @pause="isPlay=false"></audio>
        <div class="song-lyric">{{lyric}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, Ref, ref } from 'vue';
  import router from "@/router"

  let musicAudio: Ref<HTMLAudioElement> | Ref<null> = ref(null) 
  let rotateDegs: Ref<number[]> = ref([]), actTitle = ref("舟宿渡夏目漱石"), actSinger = ref("还潮"), isPlay = ref(false)
  let musicList: Ref<string[]> = ref([])
  let lyric = `我还是会想起
梅时天刮的东南风
六月里讲勿出的情愫
人世总不飘忽
我永远勿会忘记
新江桥下的运沙船
多少丧气的闲话
我从昼过一直讲到涨潮
告诉我 告诉我
你爱不爱我
我勿晓得 勿晓得
我讲勿咋出
告诉我 告诉我
你爱不爱我
我说 爱
告诉我 告诉我
你爱不爱我
我勿晓得 勿晓得
阿拉没该讲法
告诉我 告诉我
你爱不爱我
我说 唉`
  let imgUrl = "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E8%88%9F%E5%AE%BF%E6%B8%A1%E5%A4%8F%E7%9B%AE%E6%BC%B1%E7%9F%B3/%E8%88%9F%E5%AE%BF%E6%B8%A1%E5%A4%8F%E7%9B%AE%E6%BC%B1%E7%9F%B3.jpg"
  let songUrl = "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E8%B7%9D%E7%A6%BB/%E8%B7%9D%E7%A6%BB.m4a"

  /* 左区点击歌名 */
  function leftTitleClick (v: string) {
    actTitle.value = v
  }
  /* 回到主页 */  
  function logoClick (i: number) {
    if (i === 12) router.push("/")
  }
  function musicPlay (){
    console.log("plua")
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
        actTitle.value = rdList[Math.floor(Math.random()*25)]
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
  display: flex;
  .left {
    width: 50%;
    height: 100%;
    min-width: calc($leftBoxLen + 50px);
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
    flex: 1;
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
        margin-bottom: 20px;
        opacity: 0.5;
        &:hover {
          opacity: 0.9;
        }
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