<!-- music -->
<template>
  <div class="music">
    <div class="left flex-center">
      <div class="left-box">
        <ul v-if="rotateDegs.length===25">
          <li :class="{logo: i===12}" v-for="(v, i) in 25" :key="i">
            <span v-if="i!==12" :style="{transform: `rotate(${rotateDegs[i]}deg)`}">{{titles[i]}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, Ref, ref } from 'vue';

  let rotateDegs: Ref<number[]> = ref([])

  let titles: string[] = [
    "你是雾我是酒馆","重庆女人","距离","无神论","最后只好躺下来",
    "黑夜尽头","辣糖","我们不是只有现在吗", "还能孩子多久", "踊り子",
    "如愿", "黑色静态", "公开的口信", "金鱼", "银河公园",
    "失去爱情的摩托手", "沙发海", "Sofia", "我讨厌的是你的基因", "新少女祈祷",
    "低级趣味", "华生", "星星唱歌经过拥挤的人群", "爱情的枪", "舟宿渡夏目漱石"
  ]
/* ---------------------------------- */
  onBeforeMount(() => {
    for (let v of Array(25)) {
      rotateDegs.value.push(Math.random()*360)
    }
  })
</script>

<style scoped lang="scss">
  $leftBoxLen: 800px;
.music {
  width: 100vw;
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
        >li {
          box-sizing: border-box;
          // border: 1px solid gray;
          &.logo {
            background: url("wove3.svg") center/contain no-repeat;
            cursor: pointer;
            z-index: 2;
          }
          >span {
            display: inline-block;
            // line-height: calc($leftBoxLen / 5);
            font-size: 19px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .right {
    flex: 1;
    height: 100%;
    // background-color: orange;
  }
}
</style>