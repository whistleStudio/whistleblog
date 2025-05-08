<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import bus from './utils/bus';
  import commonHandles from './utils/commonHandles';

  const isGlobalAudioMuted = ref(true); // 全局音频静音状态 // 当前歌曲信息

  onBeforeMount(() => {
    sessionStorage.setItem("canBgmPlay", "yes")
    // 请求24首歌曲
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
      isGlobalAudioMuted.value = false
      commonHandles.updateViewSong(audioElement)
      if (bus.curSong.isPlaying) audioElement.play()
      else audioElement.pause()
      // App audio自动播放下一首歌曲
      audioElement.removeEventListener("ended", handleAudioEnded)
      audioElement.addEventListener("ended", handleAudioEnded)
    })
    // 总线监听：静音app音乐
    bus.on("muteAppMusic", () => {
      commonHandles.updateBusSong(audioElement)
      // audioElement.play();
      isGlobalAudioMuted.value = true
    })
  })

</script>

<template>
  <div class="app-box">
    <router-view></router-view>
  </div>
  <audio :src="bus.playlist[0].src" class="global-audio" :muted="isGlobalAudioMuted" :currentTime="bus.curSong.currentTime" :volume="bus.curSong.volume"></audio>
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
