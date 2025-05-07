import bus from "./bus";

export default {
  // 播放器单曲结束续播回调
  handleAudioEnded: function (audio: HTMLAudioElement) {
    console.log("ended")
    const currentIndex = bus.curSong.idx;
    const nextIndex = (currentIndex + 1) % bus.playlist.length; // 循环播放
    bus.curSong.idx = nextIndex;
    bus.curSong.currentTime = 0;
    console.log("nextSong", bus.playlist[nextIndex].title)
    console.log("curSong", bus.playlist[bus.curSong.idx].src)
    audio.src = bus.playlist[nextIndex].src;
    audio.play()
  },
  // 更新bus curSong
  updateBusSong: function (audio: HTMLAudioElement) { 
    bus.curSong.currentTime = audio.currentTime;
    bus.curSong.volume = audio.volume;
  },
  // 更新页面播放器音量和当前时间
  updateViewSong: function (audio: HTMLAudioElement) {
    audio.src = bus.playlist[bus.curSong.idx].src;
    audio.currentTime = bus.curSong.currentTime;
    audio.volume = bus.curSong.volume;
  }
}