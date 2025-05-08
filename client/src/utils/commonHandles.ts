import bus from "./bus";

export default {
  // 监听事件回调: 播放器单曲结束续播
  handleAudioEnded: function (audio: HTMLAudioElement) {
    console.log("ended")
    const currentIndex = bus.curSong.idx;
    const nextIndex = (currentIndex + 1) % bus.playlist.length; // 循环播放
    bus.curSong.idx = nextIndex;
    bus.curSong.currentTime = 0;
    audio.src = bus.playlist[nextIndex].src;
    audio.play()
  },
  // 监听事件回调: 暂停播放
  handleAudioPause: function () {
    bus.curSong.isPlaying = false;
  },
  handleAudioPlay: function () {
    bus.curSong.isPlaying = true;
    console.log("play")
  },

  /* ------------------- */
  // 更新bus curSong
  updateBusSong: function (audio: HTMLAudioElement) { 
    bus.curSong.currentTime = audio.currentTime;
    bus.curSong.volume = audio.volume;
  },
  // 更新页面播放器音量和当前时间
  updateViewSong: function (audio: HTMLAudioElement) {
    audio.src = bus.playlist[bus.curSong.idx].src;
    audio.currentTime = bus.curSong.currentTime-2.5/10;
    audio.volume = bus.curSong.volume;
  },
  // view卸载前更新bus
  updateBusSongBeforeUnmount: function (audio: HTMLAudioElement) {
    audio.removeEventListener("pause", this.handleAudioPause)
    bus.curSong.currentTime = audio.currentTime+3/10;
    bus.curSong.volume = audio.volume;
    bus.emit("playAppMusic")
  },
  
}