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
      <audio :src="actMusic.src" controls autoplay @play="isPlay=true" @pause="isPlay=false"></audio>
    </div>
    <div class="main" ref="main">
      <ul class="main-wrapper" :class="{active: maskMode===1, wrapFadeOut: maskMode===0}">
        <li v-for="(v, i) in musicList" :key="i" class="item flex-center" >
          <span @click="titleClick(v)" :style="{transform: `rotate(${rotateDegs[i]}deg)`}" :class="{active: actMusic.title===v}">{{v}}</span>
        </li>
      </ul>
      <div class="main-lyric" :class="{active: maskMode===1}">
        {{actMusic.lyric}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted, reactive, Ref, ref } from 'vue';
  import router from "@/router"

  interface IMusicInfo {
    title: string,
    singer: string,
    lyric: string,
    src: string,
    imgUrl: string,
    [name:string]: string
  }
  let main = ref<any>(null) 
  let rotateDegs: Ref<number[]> = ref([]), isPlay = ref(false), maskMode = ref(-1)
  let musicList: Ref<string[]> = ref([])
  let actMusic: IMusicInfo = reactive({
    title: "", singer: "", lyric: "", src: "", imgUrl: ""
  })

  /* 左区点击歌名 */
  function titleClick (v: string) {
    if (maskMode.value===1) {
      actMusic.title = v
      getActMusicInfo(v)
      setTimeout(()=>{maskMode.value = 0},50) //延迟置0，避免main.onclick触发
    }
  }
  /* 回到主页 */  
  function logoClick () {
    router.push("/")
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
    for (let v of Array(24)) {
      rotateDegs.value.push(Math.random()*360)
    }
    fetch ("/api/music/getMusicList")
    .then(res => res.json()
    .then(data => {
      if (!data.err) {
        // 随机排序
        let rdList: string[] = []
        let mcList: string[] = data.musicList
        for (let v of Array(24)) {
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
  onMounted(() => {
    main.value.onclick = () => {
      if (maskMode.value < 1) {
        maskMode.value = 1
        setTimeout(() => {
          maskMode.value = 0
        }, 5000)
      }
    }
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