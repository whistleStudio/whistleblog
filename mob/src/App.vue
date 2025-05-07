<script setup lang="ts">
  import { onBeforeMount, onMounted, ref, computed, reactive } from 'vue';
  import bus from './utils/bus';
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
    setTimeout(() => {document.title = "波文"}, 200)

    const audioElement = document.querySelector(".global-audio") as HTMLAudioElement;
    // 播放app音乐 
    bus.on("playAppMusic", () => {
      audioElement.play();
      console.log("playAppMusic:", curSong.value, bus.curSong.currentTime)
      console.log(router.currentRoute.value.path)
      isGlobalAudioMuted.value = false
      // if (router.currentRoute.value.path == "/home" && homeShowMode == 0) isGlobalAudioMuted.value = true;
      // else isGlobalAudioMuted.value = false;
    })
    // 静音app音乐
    bus.on("muteAppMusic", () => {
      updateBusSong()
      isGlobalAudioMuted.value = true
    })

      /* 更新bus song */
    function updateBusSong () {
      bus.curSong.currentTime = audioElement.currentTime;
      bus.curSong.volume = audioElement.volume;
    }

    // 自动播放下一首歌曲
    audioElement.addEventListener("ended", () => {
      console.log("ended")
      const currentIndex = bus.curSong.idx;
      const nextIndex = (currentIndex + 1) % bus.playlist.length; // 循环播放
      bus.curSong.idx = nextIndex;
      bus.curSong.currentTime = 0;
      console.log("nextSong", bus.playlist[nextIndex].title)
      setTimeout(() => {
        console.log("curSong", bus.playlist[curSong.value.idx].src)
        audioElement.src = bus.playlist[nextIndex].src;
        audioElement.play()
      }, 50)
      
    });
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
