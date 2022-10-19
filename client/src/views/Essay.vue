<!-- Essay -->
<template>
  <div class="essay flex-center">
    <div>
      <div class="search flex-center">
        <div class="logo" @click="logoClick"></div> <span>/</span>
        <input ref="kwIp" type="text" placeholder="关键词" v-model="kw" @focus="ipFocus">
      </div>
      <div class="main">
        <div class="cate flex-center">
          <div>
            <span>{{showMode!==2 ? actCate : "Search"}}</span>
            <span class="cate-icon" :class="{'cate-icon-exp': isCateExp}" @click="cateIconClick(1)">&nbsp;{{isCateExp ?
            '|' : '➡'}}</span>
          </div>
          <ul v-if="isCateExp" class="flex-center">
            <li v-for="(v, i) in articleCate" :key="i" @click="cateClick(0, pageCount*2, v)">{{v}}</li>
            <li class="cate-icon" @click="cateIconClick(0)">⬅</li>
          </ul>
        </div>
        <ul class="article" v-if="showMode===1">
          <li class="article-li" v-for="(v, i) in essayList" :key="i" @click="articleLiClick(v)">
            <p class="article-title">{{v.title}}</p>
            <p class="article-frag">{{v.sum}}</p>
            <ul class="flex-center">
              <li v-for="(cv, ci) in v.tag.split('|')" :key="ci"><span :style="{backgroundColor: artCate[cv]}"></span><span>&nbsp;&nbsp;{{cv}}</span></li>
            </ul>
          </li>
        </ul>
        <div ref="artContent" class="content" v-else-if="showMode===0">
          <iframe ref="ifr" scrolling="no" :src="(actEssay as IEssay).src" frameborder="0" @load="getIfrHeight"></iframe>
        </div>
        <div class="result" v-else>
          <ul v-if="searchList.length">
            <li v-for="(v, i) in searchList" :key="i" @click="articleLiClick(v)">
              <div class="result-title">{{v.title}}</div>
              <div class="result-sum">{{v.sum}}</div>
            </li>
          </ul>
          <span v-else>相关的文档还没写呢~</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from "vue"

interface IEssay {
  tag: string,
  title: string,
  sum: string,
  src: string,
  genDate: Date
}
// input, iframe, content - DOM对象
let kwIp = ref<any>(null), ifr = ref<any>(null), artContent = ref<any>(null), articleCate = ref<string[]>(["All"]), artCate = ref<{[propName: string]:string}>({})
// showMode 1-列表 0-文章 2-搜索；artHeight 除去搜索，目录单页列表占满时高度
const artLiHeight = 150, articleCate2 = ["All", "JavaScript", "NodeJs", "Vue", "TypeScript", "Others"]
let artHeight: number, maxTopScroll = 0, pageIdx = 0
let isCateExp = ref<boolean>(false), showMode = ref<number>(1), essayList = ref<IEssay[]>([]), actEssay = ref<IEssay>(), actCate = ref<string>(articleCate.value[0]),
  pageCount = ref<number>(0), kw = ref<string>(""), searchList = ref<IEssay[]>([])

/* 回到主页 */
function logoClick() {
  router.push("/")
}

/* 目录展开/折叠 */
function cateIconClick(exp: number) {
  if (exp) isCateExp.value = true
  else isCateExp.value = false
}

/* 切换至文章具体内容 */
function articleLiClick(e: IEssay) {
  actEssay.value = e
  showMode.value = 0
}

/* 请求目录 */
function getCate () {
  fetch(`/api/essay/getCate`)
  .then(res => res.json()
  .then(data => {
    if (!data.err) {
      artCate.value = data.cate
      articleCate.value.push(...Object.keys(data.cate))
    } else alert(data.msg)
  }))
}
/* 请求类别文章 */
function cateClick(pageSkip: number, pageNum: number, cate: string) {
  fetch(`/api/essay/pageList?pageSkip=${pageSkip}&pageNum=${pageNum}&cate=${cate}`)
    .then(res => res.json()
      .then(data => {
        if (!data.err) {
          if (pageNum === pageCount.value * 2) {
            essayList.value = data.essayList
            showMode.value = 1; actCate.value = cate; maxTopScroll = 0; pageIdx = 0
          } else essayList.value.push(...data.essayList)
        } else alert(data.msg)
      }))
}

/* 搜索框选中 */
function ipFocus() {
  document.onkeydown = ev => {
    if (ev.key === "Enter") {
      searchList.value = []
      kwSearch(kw.value)
      kwIp.value.blur()
    }
  }
}

/* 关键词搜索 */
function kwSearch (keyword: string) {
  fetch(`/api/essay/kwSearch?kw=${keyword}`)
  .then(res => res.json()
  .then(data => {
    if (!data.err) {
      // console.log(data.searchList)
      searchList.value = data.searchList
      showMode.value = 2 
    } else alert(data.msg)
  }))
}

/* 请求iframe内容高度 */
function getIfrHeight () {
  console.log("ifr onload")
  ifr?.value?.contentWindow.postMessage("getHeight", "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com")
}

/* ------------------------------------ */
onMounted(() => {
  getCate()
  // 默认输入框聚焦
  kwIp?.value?.focus()
  artHeight = document.documentElement.clientHeight - 170 - 50 //search 170, cate 50
  pageCount.value = Math.floor(artHeight / artLiHeight) * 3
  // console.log(pageCount.value)
  // 预先请求一页的内容
  cateClick(0, pageCount.value*2, "All")
  // 监听滚动条
  window.onscroll = () => {
    let s = document.body.scrollTop || document.documentElement.scrollTop
    maxTopScroll = s > maxTopScroll ? s : maxTopScroll
    // console.log(document.documentElement.clientHeight, "----", s)
    if (showMode.value && maxTopScroll >= (pageIdx + 0.5) * artHeight) {
      cateClick(essayList.value.length, pageCount.value, actCate.value)
      pageIdx++
    }
  }
  // 监听跨域iframe发送的页面高度消息
  window.addEventListener("message", e => {
    if (e.origin === "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com") {
      artContent.value.style.height = e.data + "px"
    }
  })
})
</script>

<style scoped lang="scss">
.essay {
  width: calc(100vw - 20px);
  height: 100vh;
  // background-color: rgb(98, 126, 98);
  >div {
    width: 60%;
    height: 100%;
    .search {
      width: 100%;
      height: 70px;
      // background-color: rgb(67, 99, 67);
      margin: 50px auto;
      opacity: 0.9;
      justify-content: flex-start;
      .logo {
        width: 50px;
        height: 50px;
        background: url("wove3.svg") center/cover no-repeat;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          opacity: 0.6;
        }
      }
      >span {
        display: inline-block;
        font: 50px/70px $fontF;
        margin-right: 20px;
      }
      input {
        flex: 1;
        font: 25px/35px $fontF;
        height: 35px;
        width: 80%;
        border: none;
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder {
          opacity: 0.3;
        }
      }
    }
    .main {
      width: 100%;
      .cate {
        display: flex;
        justify-content: flex-start;
        font: 20px/50px $fontF;
        >div:first-of-type {
          span {
            font-weight: bold;
            cursor: pointer;
            &:not(:last-of-type) {
              opacity: 0.85;
            }
          }
        }
        .cate-icon {
          font-size: 23px;
          opacity: 0.7;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
        .cate-icon-exp {
          opacity: 0.85 !important;
          cursor: default !important;
        }
        >ul {
          li:not(:last-of-type) {
            opacity: 0.5;
            margin: 0 35px;
            cursor: pointer;
            &:hover {
              opacity: 0.9;
            }
          }
        }
      }
      .article {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .article-li {
          $width: 32.9%;
          width: $width;
          height: 150px;
          background-color: rgb(245, 245, 245);
          margin-bottom: calc((100% - $width * 3) / 2);
          text-align: left;
          box-sizing: border-box;
          border-radius: 3px;
          padding: 15px;
          cursor: pointer;
          &:not(:nth-of-type(3n)) {
            margin-right: calc((100% - $width * 3) / 2);
          }
          &:hover {
            background-color: rgb(238, 238, 238);
          }
          .article-title {
            font: 17px/23px $fontF;
            opacity: 0.9;
          }
          .article-frag {
            margin: 10px 0 20px;
            width: 100%;
            white-space: wrap;
            height: 50px;
            font: 15px/25px $fontF;
            word-wrap: break-word;
            overflow: hidden;
            opacity: 0.6;
          }
          >ul {
            justify-content: flex-start;
            font: 14px/17px $fontF;
            opacity: 0.4;
            li {
              margin-right: 20px;
              span {
                display: inline-block;
                vertical-align: middle;
                &:first-of-type {
                  width: 14px;
                  height: 14px;
                  background-color: rgb(240, 197, 212);
                  border-radius: 50%;
                }
                &:last-of-type {
                  white-space: pre-wrap;
                }
              }
            }
          }
        }
      }

      .content {
        width: 100%;
        height: 100%;

        iframe {
          width: 100%;
          height: 100%;

        }
      }

      .result {
        >ul {
          >li {
            margin-bottom: 30px;
            text-align: left;
            cursor: pointer;
            opacity: 0.8;
            &:hover {opacity: 1;}
            .result-title {
              font: 22px/40px $fontF;
            }
            .result-sum {
              opacity: 0.8;
            }
          }
        }
        >span {
          display: block;
          text-align: left;
          font: 17px/40px $fontF;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>