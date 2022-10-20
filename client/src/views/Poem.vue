<!-- poem -->
<template>
  <div class="poem" v-if="menuList[actAuthorIdx]?.list">
    <div class="head">
      <div class="head-bar">
        <div class="logo" @click="logoClick"></div>
        <ul>
          <li @click="headAuthorClick(i)" v-for="(v, i) in menuList" :key="i" :class="{active: actAuthorIdx===i}">{{v.author}}</li>
          <li>@关于</li>
        </ul>
      </div>
    </div>
    <div class="main">
      <!-- 目录 -->
      <div class="cate">
        <ul>
          <li class="cate-li"  v-for="(v, i) in menuList[actAuthorIdx].list" :key="i">
            <span @click="cateLiClick(i)" :class="{active: actCateIdx === i}">{{v.cate}}</span>
            <ul v-if="actCateIdx === i && !isMenuCollapse">
              <li @click="cateItemClick(ci)" class="cate-item" :class="{active: 100*i+ci === actItemStyIdx}" v-for="(cv, ci) in v.titles" :key="ci">{{cv}}</li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 正文 -->
      <div class="content flex-col-ycenter">
        <div>
          <div class="poem-img">
            <div :style="{backgroundImage: `url(${poemInfo.imgUrl})`}"></div>
            <span>{{poemInfo.title}}</span>
          </div>
          <div class="poem-body">
            {{poemInfo.txt}}
          </div>
          <div class="poem-bot"><span v-if="poemInfo.author!=='他界'" class="poem-author">{{poemInfo.author}}&nbsp;&nbsp;&nbsp;</span><span class="poem-date">{{poemInfo.date}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from "@/router"
  import { computed } from "@vue/reactivity";
  import {reactive, ref, onBeforeMount, Ref} from "vue"

  interface IpoemInfo {
    title?: string,
    author?: string,
    imgUrl?: string,
    txt?: string,
    date?: string,
    color?: number
  }
  interface IcateInfo {
    cate: string,
    titles: string[] | []
  }
  interface IMenuInfo {
    author: string,
    list: Array<IcateInfo>
  }

  let menuList: Array<IMenuInfo> = reactive([])
  let poemInfo: Ref<IpoemInfo> = ref({})
  let actAuthorIdx =ref(0), actCateIdx = ref(0), actItemIdx = ref(0), isMenuCollapse = ref(true), actItemStyIdx = ref(0)
  const actAuthor = computed<string>(() => menuList[actAuthorIdx.value].author)
  const actTitle = computed<string>(() => menuList[actAuthorIdx.value].list[actCateIdx.value].titles[actItemIdx.value])
  
  /* 回到主页 */  
  function logoClick () {
    router.push("/")
  }
  /* 点击顶部作者 */
  function headAuthorClick (i: number) {
    actAuthorIdx.value = i
    actCateIdx.value = 0; actItemIdx.value = 0; actItemStyIdx.value = 0
    getPoem(actAuthor.value, actTitle.value)
  }
  /* 点击侧边分类 */
  function cateLiClick (i: number) {
    if (actCateIdx.value === i)
      isMenuCollapse.value = !isMenuCollapse.value
    else {actCateIdx.value = i; isMenuCollapse.value = false}
  }
  /* 点击侧边诗标题 */
  function cateItemClick (ci: number) {
    actItemStyIdx.value = 100*actCateIdx.value + ci //控制标题激活样式
    console.log(actItemStyIdx.value)
    actItemIdx.value = ci
    getPoem(actAuthor.value, actTitle.value)
  }
  /* 请求单例具体内容 */
  function getPoem (author: string, title: string):void {
    fetch(`/api/poem/getPoem?author=${author}&title=${title}`)
    .then(res => res.json()
    .then(data => {
      if (!data.err) {
        poemInfo.value = data.poemInfo
        console.log(typeof poemInfo.value)
      } else alert(data.msg)
    }))
  }
  /* ----------------------- */
  onBeforeMount(() => {
    /* 请求目录 */
    fetch("/api/poem/getMenu")
    .then(res => res.json()
    .then(data => {
      if (!data.err) {
        menuList.push(...data.menuList)
        // menuList = [{author: "whistle", list: [{cate: "2015", titles:["xxx"]}]}]
        // console.log(actAuthor, acdgtTitle)
        getPoem (actAuthor.value, actTitle.value)
      } else alert(data.msg)
      console.log("menulist ---", menuList)
    }))
  })
</script>

<style scoped lang="scss">
  $headH: 80px;
  .poem {
    width: calc(100vw - 20px);
    height: 100vh;
    .head {
      width: 100%;
      height: $headH;
      position: fixed;
      background-color: white;
      z-index: 2;
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
            &.active {
              opacity: 1;
              font-weight: bold;
            }
            &:hover {
              opacity: 1;
              // font-weight: bold;
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
              opacity: 0.3;
              &:hover {
                opacity: 0.6;
              }
              &.active {
                opacity: 0.9;  
              }
            }
            >ul {
              .cate-item {
                text-align: start;
                text-indent: 14px;
                font: 15px/30px $fontF;
                opacity: 0.7;
                cursor: pointer;
                &.active {
                  opacity: 0.9;
                  text-decoration: underline;
                  text-underline-offset: 5px;
                }
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
              background:  center/cover no-repeat;
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
              opacity: 0.8;
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
            &::after {
              display: block;
              content: "";
              height: 100px;
            }
          }
        }
      }
    }
  }
</style>