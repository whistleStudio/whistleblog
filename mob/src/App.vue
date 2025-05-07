<script setup lang="ts">
  import { onBeforeMount, onMounted, ref, computed } from 'vue';
  import bus from './utils/bus';
  import commonHandles from './utils/commonHandles';
  import router from "@/router"

  const isGlobalAudioMuted = ref(true); // 全局音频静音状态 // 当前歌曲信息
  const curSong = computed(() => bus.curSong); // 当前歌曲的src
  // const curSongCurrentTime = computed(() => bus.curSong.currentTime); // 当前歌曲的播放时间
  // const curSongVolume = computed(() => bus.curSong.volume); // 当前歌曲的音量



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
    //     console.log(bus.curSong)
    //   }))
    // }))
    fetch(`/api/music/getMusicInfoList`)
    .then(res => res.json()
    .then(data => {
      console.log(data.musicInfoList)
      bus.playlist = data.musicInfoList
    }))
  })
  onMounted(() => {
    setTimeout(() => {document.title = "波文"}, 200) // 过审用
    const audioElement = document.querySelector(".global-audio") as HTMLAudioElement;

    // 单曲结束事件
    const handleAudioEnded = () => { commonHandles.handleAudioEnded(audioElement) }
    // 监听：移除App audio ended事件
    bus.on("removeAppAudioEnded", () => {audioElement.removeEventListener("ended", handleAudioEnded)})
    // 总线监听：播放app音乐 
    bus.on("playAppMusic", () => {
      commonHandles.updateViewSong(audioElement)
      audioElement.play();
      isGlobalAudioMuted.value = false
      // App audio自动播放下一首歌曲
      audioElement.removeEventListener("ended", handleAudioEnded)
      audioElement.addEventListener("ended", handleAudioEnded)
      // if (router.currentRoute.value.path == "/home" && homeShowMode == 0) isGlobalAudioMuted.value = true;
      // else isGlobalAudioMuted.value = false;
    })
    // 总线监听：静音app音乐
    bus.on("muteAppMusic", () => {
      commonHandles.updateBusSong(audioElement)
      audioElement.play();
      isGlobalAudioMuted.value = true
    })


  })

</script>

<template>
  <div class="app-box">
    <router-view></router-view>
  </div>
  <audio :src="bus.playlist[0].src" class="global-audio" :muted="isGlobalAudioMuted" :currentTime="curSong.currentTime" :volume="curSong.volume"></audio>
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
