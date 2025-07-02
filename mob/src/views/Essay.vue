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
            <span @click="backCateAll">{{showMode!==2 ? actCate : "Search"}}</span>
            <span class="cate-icon" :class="{'cate-icon-exp': isCateExp}" @click="cateIconClick(1)">&nbsp;{{isCateExp ? '|' : '➡'}}</span>
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
          <div v-if="iframeLoading" class="iframe-loading">正在加载...</div>
          <div v-if="iframeError" class="iframe-error">加载失败，请重试</div>
          <iframe
            ref="ifr"
            scrolling="no"
            :src="(actEssay as IEssay)?.src"
            frameborder="0"
            @load="onIframeLoad"
            @error="onIframeError"
          ></iframe>
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
import { onMounted, ref, watch, onBeforeUnmount } from "vue"
import { useRoute } from 'vue-router'
const route = useRoute()

interface IEssay {
  _id: string,
  tag: string,
  title: string,
  sum: string,
  src: string,
  genDate: Date
}

let kwIp = ref<any>(null),
    ifr = ref<any>(null),
    artContent = ref<any>(null),
    articleCate = ref<string[]>(["All"]),
    artCate = ref<{[propName: string]:string}>({});
const artLiHeight = 150
let artHeight: number, maxTopScroll = 0, pageIdx = 0
let isCateExp = ref<boolean>(false),
    showMode = ref<number>(1),
    essayList = ref<IEssay[]>([]),
    actEssay = ref<IEssay>(),
    actCate = ref<string>(articleCate.value[0]),
    pageCount = ref<number>(0),
    kw = ref<string>(""),
    searchList = ref<IEssay[]>([])

const iframeLoading = ref(true), iframeError = ref(false)

function logoClick() {
  router.push("/")
}

function cateIconClick(exp: number) {
  isCateExp.value = !!exp
}

function articleLiClick(e: IEssay) {
  actEssay.value = e
  showMode.value = 0
  iframeLoading.value = true
  iframeError.value = false
  // 路由跳转携带文章id
  router.push({ name: 'EssayView', params: { id: e._id } })
}

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
function cateClick(pageSkip: number, pageNum: number, cate: string) {
  fetch(`/api/essay/pageList?pageSkip=${pageSkip}&pageNum=${pageNum}&cate=${cate}`)
    .then(res => res.json()
      .then(data => {
        if (!data.err) {
          if (pageNum === pageCount.value * 2) {
            essayList.value = data.essayList
            showMode.value = 1; actCate.value = cate; maxTopScroll = 0; pageIdx = 0
          } else essayList.value.push(...data.essayList)
          // 跳转到无id的路由
          if (route.params.id) router.push({ name: "essay" })
          showMode.value = 1
        } else alert(data.msg)
      }))
}
function backCateAll () {
  isCateExp.value = false
  showMode.value = 1
  cateClick(0, pageCount.value*2, "All")
}
function ipFocus() {
  document.onkeydown = ev => {
    if (ev.key === "Enter") {
      searchList.value = []
      kwSearch(kw.value)
      kwIp.value.blur()
    }
  }
}
function kwSearch (keyword: string) {
  fetch(`/api/essay/kwSearch?kw=${keyword}`)
  .then(res => res.json()
  .then(data => {
    if (!data.err) {
      searchList.value = data.searchList
      showMode.value = 2 
    } else alert(data.msg)
  }))
}
function onIframeLoad() { // iframe加载完成
  iframeLoading.value = false
  iframeError.value = false
  getIfrHeight()
}
function onIframeError() { // iframe加载失败
  iframeLoading.value = false
  iframeError.value = true
}
function getIfrHeight () {
  ifr?.value?.contentWindow.postMessage("getHeight", "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com")
}

// 监听路由id参数变化，自动切换文章
watch(() => route.params.id, (id) => {
  if (id) {
    // 支持id切换时自动加载详情
    const match = essayList.value.find(e => e._id === id)
    if (match) {
      actEssay.value = match
      showMode.value = 0
      iframeLoading.value = true
      iframeError.value = false
    } else {
      fetch(`/api/essay/one?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.err) {
            actEssay.value = data.essay
            showMode.value = 0
            iframeLoading.value = true
            iframeError.value = false
          } else {
            actEssay.value = undefined
            showMode.value = 1
            iframeError.value = true
          }
        })
    }
  } else {
    showMode.value = 1
  }
})

const messageHandler = (e: MessageEvent) => {
  if (e.origin === "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com") {
    artContent.value.style.height = e.data + "px"
  }
}
onMounted(() => {
  getCate()
  kwIp?.value?.focus()
  artHeight = document.documentElement.clientHeight - 170 - 50
  pageCount.value = Math.floor(artHeight / artLiHeight) * 3
  if(!route.params.id) cateClick(0, pageCount.value*2, "All")
  window.onscroll = () => {
    let s = document.body.scrollTop || document.documentElement.scrollTop
    maxTopScroll = s > maxTopScroll ? s : maxTopScroll
    if (showMode.value && maxTopScroll >= (pageIdx + 0.5) * artHeight) {
      cateClick(essayList.value.length, pageCount.value, actCate.value)
      pageIdx++
    }
  }
  window.addEventListener("message", messageHandler)
  // 处理直接url跳转，如果路由有id参数，自动定位到对应文章
  if (route.params.id) {
    const id = route.params.id
    const match = essayList.value.find(e => e._id === id)
    if (match) {
      actEssay.value = match
      showMode.value = 0
      iframeLoading.value = true
      iframeError.value = false
    } else {
      fetch(`/api/essay/one?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.err) {
            actEssay.value = data.essay
            showMode.value = 0
            iframeLoading.value = true
            iframeError.value = false
          } else {
            actEssay.value = undefined
            showMode.value = 1
            iframeError.value = true
          }
        })
    }
  }
})

onBeforeUnmount(() => {
  window.onscroll = null
  window.removeEventListener("message", messageHandler)
})
</script>

<style scoped lang="scss">
.essay {
  padding: 20px;
  height: 100vh;
  // background-color: rgb(98, 126, 98);
  >div {
    width: 100%;
    height: 100%;
    .search {
      width: 100%;
      height: 70px;
      // background-color: rgb(67, 99, 67);
      opacity: 0.9;
      justify-content: flex-start;
      .logo {
        width: 45px;
        height: 45px;
        background: url("/wove3.svg") center/cover no-repeat;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          opacity: 0.6;
        }
      }
      >span {
        display: inline-block;
        font: 45px/70px $fontF;
        margin-right: 20px;
      }
      input {
        flex: 1;
        font: 21px/35px $fontF;
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
        font: 17px/30px $fontF;
        >div:first-of-type {
          span {
            font-weight: bold;
            cursor: pointer;
            white-space: nowrap;
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
          flex-wrap: wrap;
          justify-content: flex-start;
          li:not(:last-of-type) {
            opacity: 0.5;
            margin: 0 12px;
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
        flex-direction: column;
        // flex-wrap: wrap;
        margin-top: 10px;
        &::after {
          display: block;
          content: "";
          height: 10px;
        }
        .article-li {
          $width: 32.9%;
          width: 100%;
          height: 120px;
          background-color: rgb(245, 245, 245);
          margin-bottom: 10px;
          text-align: left;
          box-sizing: border-box;
          border-radius: 5px;
          padding: 10px;
          cursor: pointer;
          &:not(:nth-of-type(3n)) {
            margin-right: calc((100% - $width * 3) / 2);
          }
          &:hover {
            background-color: rgb(238, 238, 238);
          }
          .article-title {
            font: 17px/23px $fontF;
            height: 23px;
            opacity: 0.9;
            overflow: hidden;
          }
          .article-frag {
            margin: 10px 0 15px;
            width: 100%;
            white-space: wrap;
            height: 40px;
            font: 12px/20px $fontF;
            word-wrap: break-word;
            overflow: hidden;
            opacity: 0.6;
          }
          >ul {
            justify-content: flex-start;
            font: 12px/12px $fontF;
            opacity: 0.4;
            li {
              margin-right: 20px;
              span {
                display: inline-block;
                vertical-align: middle;
                &:first-of-type {
                  width: 12px;
                  height: 12px;
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
        margin-bottom: -50px;
        iframe {
          width: 100%;
          height: 100%;

        }
      }

      .result {
        >ul {
          margin-top: 10px;
          width: 100%;
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
              width: 100%;
              overflow: hidden;
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