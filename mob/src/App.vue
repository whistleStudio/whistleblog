<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import bus from './utils/bus';
  import router from "@/router"

  const isGlobalAudioMuted = ref(true); // 全局音频静音状态




  onBeforeMount(() => {
    sessionStorage.setItem("canBgmPlay", "yes")
    // 请求25首歌曲
    // fetch(`/api/music/getMusicList`)
    // .then(res => res.json()
    // .then(data => {
    //   bus.playlist = data.musicList
    //   console.log(bus.playlist)
    //   fetch(`/api/music/getActMusicInfo?actTitle=${bus.playlist[0]}`)
    //   .then(res => res.json()
    //   .then(data => {
    //     let actMusicInfo = data.actMusicInfo
    //     actMusicInfo.currentTime = 0
    //     actMusicInfo.volume = 0.5
    //     bus.curSong = actMusicInfo
    //   }))
    // }))
  })
  onMounted(() => {
    setTimeout(() => {document.title = "波文"}, 200)

    const audioElement = document.querySelector(".global-audio") as HTMLAudioElement;
    // 监听音乐播放事件 
    bus.on("playMusic", (homeShowMode) => {
      if (bus.curSong.src === "") return
      updateAppSong()
      audioElement.play();
      console.log(router.currentRoute.value.path)
      if (router.currentRoute.value.path == "/home" && homeShowMode == 0) isGlobalAudioMuted.value = true;
      else isGlobalAudioMuted.value = false;
    })
    bus.on("updateBusSong", () => { updateBusSong() })

    /* 更新App song */
    function updateAppSong () {
      audioElement.src = bus.curSong.src
      audioElement.currentTime = bus.curSong.currentTime;
      audioElement.volume = bus.curSong.volume;
    }   

    /* 更新bus song */
    function updateBusSong () {
      bus.curSong.src = audioElement.src
      bus.curSong.currentTime = audioElement.currentTime;
      bus.curSong.volume = audioElement.volume;
    }
  })
</script>

<template>
  <div class="app-box">
    <router-view></router-view>
  </div>
  <audio src="" class="global-audio" :muted="isGlobalAudioMuted"></audio>
</template>

<style scoped lang="scss">
.app-box {
  width: 100vw;
  height: 100vh;
  // background-color: pink;
}
.global-audio {
  display: none;
}
</style>
