import defaultInfo from "./defaultInfo";

type EventCallback = (...args: any[]) => void;

interface EventList {
  [key: string]: EventCallback[];
}

interface IMusic {
  title: string,
  singer: string,
  src: string,
  lyric: string,
  imgUrl: string,
  favor: number
  [key: string]: any
}

interface Song  {
  idx: number;
  currentTime: number;
  volume: number;
  isPlaying: boolean; 
}

interface Bus {
  evlist: EventList;
  on: (name: string, cb: EventCallback) => void;
  emit: (name: string, ...args: any[]) => void;
  curSong: Song;
  playlist: IMusic[];
  appAudio?: HTMLAudioElement
}

const bus: Bus = {
  evlist: {},
  // 注册监听事件；同一主题，允许多个订阅者，所以是事件组
  on: function (name, cb) {
    console.log("on", name);
    let fnArr = this.evlist[name] || [];
    fnArr.push(cb);
    this.evlist[name] = fnArr; // 初次注册主题需要
  },
  // 触发事件；不同订阅者触发不同事件
  emit: function (name, ...args) {
    console.log("emit:", name);
    let fnArr = this.evlist[name];
    fnArr.forEach(cb => {
      cb.apply(this, args);
    });
  },

  curSong: {
    idx: 0,
    currentTime: 0,
    volume: 0.6, 
    isPlaying: false, // 播放状态
  },

  playlist: [defaultInfo.defaultSong],
  
};

export default bus;
export type {IMusic, Song};