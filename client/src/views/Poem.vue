<!-- poem -->
<template>
  <div class="poem">
    <div class="head">
      <div class="head-bar">
        <div class="logo" @click="logoClick"></div>
        <ul>
          <li>哨子</li>
          <li>子秋</li>
          <li>他界</li>
          <li>| 关于</li>
        </ul>
      </div>
    </div>
    <div class="main">
      <!-- 目录 -->
      <div class="cate">
        <ul>
          <li class="cate-li" v-for="(v, i) in cateInfo" :key="i">
            <span @click="cateLiClick(i)">{{v.cate}}</span>
            <ul v-if="actCateIdx === i">
              <li class="cate-item" v-for="(cv, ci) in v.item" :key="ci">{{cv}}</li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 正文 -->
      <div class="content flex-col-ycenter">
        <div>
          <div class="poem-img">
            <div></div>
            <span>{{poemInfo.title}}</span>
          </div>
          <div class="poem-body">
            {{poemInfo.txt}}
          </div>
          <div class="poem-bot"><span class="poem-author">{{poemInfo.author}}</span>&nbsp;&nbsp;&nbsp;<span class="poem-date">{{poemInfo.date}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from "@/router"
  import {reactive, ref, onMounted} from "vue"

  interface IpoemInfo {
    title: string,
    author: string,
    imgUrl?: string,
    txt: string,
    date: string
  }
  interface IcateInfo {
    cate: string,
    item: string[] | []
  }

  const poemInfo: IpoemInfo = reactive({
    title: "归",
    author: "哨子",
    imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/poem/whistle/%E5%BD%92/backhome.jpg",
    txt: `二月落雪消逝的南方\n你坐在车厢遥望着远方\n晴朗透过车窗印在你眼里\n静静地从眼角流淌\n飘向那条小巷 那棵树旁\n等待 变成了光`,
    date: "2016-02-04"
  })
  const cateInfo: Array<IcateInfo> = reactive([
    {cate: "2016", item: ["归"]},
    {cate: "2017", item: ["归2"]},
    {cate: "2018", item: ["归3"]},
    {cate: "2019", item: ["归"]},
    {cate: "2020", item: ["归2"]},
    {cate: "2021", item: ["归3"]},
  ])
  let actCateIdx = ref(-1), actItemIdx = ref(0)

  function logoClick () {
    router.push("/")
  }
  function cateLiClick (i: number) {
    if (actCateIdx.value === i)
      actCateIdx.value = -1
    else actCateIdx.value = i
  }

  onMounted(() => {

  })
</script>

<style scoped lang="scss">
  $headH: 80px;
  .poem {
    width: 100vw;
    height: 100vh;
    .head {
      width: 100%;
      height: $headH;
      position: fixed;
      background-color: white;
      .head-bar {
        margin: 0 auto;
        width: 55%;
        height: 100%;
        // background-color: aquamarine;
        display: flex;
        align-items: center;
        .logo {
          width: 40px;
          height: 40px;
          background: url("wove.svg");
          opacity: 0.75;
          border: 2.5px solid white;
          border-radius: 50%;
          filter: invert(100%);
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
        >ul {
          display: flex;
          margin-left: auto;
          // background-color: yellow;
          li {
            margin-left: 50px;
            font: 17px $fontF;
            line-height: $headH;
            opacity: 0.85;
            cursor: pointer;
            &:hover {
              opacity: 1;
              font-weight: bold;
            }
          }
        }
      }
    }
    .main {
      box-sizing: border-box;
      width: 55%;
      height: 100%;
      padding-top: $headH;
      // background-color: yellow;
      margin: 0 auto;
      display: flex;
      .cate {
        width: 300px;
        height: 100%;
        // background-color: green;
        display: flex;
        align-items: center;
        ul {
          .cate-li {
            >span {
              font: 22px/70px $fontF;
              cursor: pointer;
              opacity: 0.5;
              &:hover {
                opacity: 0.9;
              }
            }
            >ul {
              .cate-item {
                text-align: start;
                text-indent: 14px;
                font: 15px/30px $fontF;
              }
            }
          }
        }
      }
      .content {
        flex: 1;
        // background-color: red;
        display: flex;
        justify-content: center;

        // opacity: 0.5;
        >div {
          width: 650px;
          height: 100%;
          // background-color: yellowgreen;
          .poem-img {
            text-align: center;
            margin-top: 30px;
            width: 600px;
            height: 300px;
            position: relative;
            >div {
              width: 100%;
              height: 100%;
              background: url("pic/backhome.jpg") center/cover no-repeat;
              -webkit-mask : url("pic/poemask.png") center/contain no-repeat;
              mask: url("pic/poemask.png") center/contain no-repeat;
              position: absolute;
              opacity: 0.5;
            }
            >span {
              position:absolute;
              bottom: 70px;
              font: bold 30px $fontF;
              left: 50%;
              transform: translateX(-50%);
              opacity: 0.9;
            }
          }
          .poem-body {
            width: 600px;
            white-space: pre-line;
            font: 17px/60px $fontF;
          }
          .poem-bot {
            width: 70%;
            display: flex;
            justify-content: flex-end;
            font-size: 15px;
            margin-top: 20px;
            opacity: 0.9;
          }
        }
      }
    }
  }
</style>