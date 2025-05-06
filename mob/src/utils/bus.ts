type EventCallback = (...args: any[]) => void;

interface EventList {
  [key: string]: EventCallback[];
}

interface Song {
  title: string;
  singer: string;
  picUrl: string;
  src: string;
  currentTime: number;
  duration: number;
  volume: number; 
}

interface Bus {
  evlist: EventList;
  on: (name: string, cb: EventCallback) => void;
  emit: (name: string, ...args: any[]) => void;
  curSong: Song;
  updateCurSong: (song: Song) => void;
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
    title: "",
    singer: "",
    picUrl: "",
    src: "",
    currentTime: 0,
    duration: 0,
    volume: 0, 
  },

  updateCurSong: function (song: Song) {
    this.curSong = song
  }
  
};

export default bus;