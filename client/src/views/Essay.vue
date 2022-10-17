<!-- Essay -->
<template>
  <div class="essay flex-center">
    <div>
      <div class="search flex-center">
        <div class="logo" @click="logoClick"></div> <span>/</span>
        <input ref="kwIp" type="text" placeholder="关键词">
      </div>
      <div class="main">
        <div class="cate flex-center">
          <div>
            <span>All</span>
            <span class="cate-icon" :class="{'cate-icon-exp': isCateExp}" @click="cateIconClick(1)">&nbsp;{{isCateExp ? '|' : '➡'}}</span>
          </div>
          <ul v-if="isCateExp" class="flex-center">
            <li v-for="(v, i) in articleCate" :key="i" @click="cateClick(v)">{{v}}</li>
            <li class="cate-icon" @click="cateIconClick(0)">⬅</li>
          </ul>
        </div> 
        <ul class="article" v-if="showMode">
          <li class="article-li" v-for="(v, i) in essayList" :key="i" @click="articleLiClick(v)">
            <p class="article-title">{{v.title}}</p>
            <p class="article-frag">{{v.sum}}</p>
            <ul class="flex-center">
              <li v-for="(cv, ci) in v.tag.split('|')" :key="ci"><span></span><span>&nbsp;&nbsp;{{cv}}</span></li>
            </ul>
          </li>
        </ul>
        <div class="content" v-else>
          <iframe scrolling="no" :src="(actEssay as IEssay).src" frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import router from '@/router';
  import { onMounted, ref} from "vue"

  interface IEssay {
    tag: string,
    title: string,
    sum: string,
    src: string,
    genDate: Date
  }
  let kwIp = ref<any>(null)
  let isCateExp = ref<boolean>(false), showMode = ref<number>(1), essayList = ref<IEssay[]>([]), actEssay = ref<IEssay>()
  const artLiHeight = 150, articleCate = ["All", "JavaScript", "NodeJs", "Vue", "TypeScript"]
  let artHeight: number, pageNum: number

  /* 回到主页 */  
  function logoClick () {
    router.push("/")
  }
  /* 目录展开/折叠 */
  function cateIconClick (exp: number) {
    if (exp) isCateExp.value = true
    else isCateExp.value = false
  }
  /* 切换至文章具体内容 */
  function articleLiClick (e: IEssay) {
    actEssay.value = e
    showMode.value = 0
  }
  /* 请求类别文章 */
  function cateClick (cate: string) {
    fetch(`/api/essay/getCateEssay?cate=${cate}`)
    .then(res => res.json()
    .then(data => {
      if (!data.err) {

      } else alert(data.msg)
    }))
  }
  /* ---------------------- */
  onMounted(() => {
    // 默认输入框聚焦
    kwIp?.value?.focus()
    // console.log(document.documentElement.clientHeight)
    artHeight = document.documentElement.clientHeight - 170 -50 //search 170, cate 50
    pageNum = Math.floor(artHeight / artLiHeight) * 3 
    console.log(pageNum)
    fetch(`/api/essay/pageList?pageSkip=0&pageNum=${pageNum*2}&cate=All`)
    .then(res => res.json()
    .then(data => {
      if (!data.err) {
        console.log(data.essayList)
        essayList.value = data.essayList
      } else alert(data.msg)
    }))
  })
</script>

<style scoped lang="scss">
  .essay {
    width: calc(100vw - 20px);
    height: 100vh;
    // background-color: rgb(98, 126, 98);
    > div {
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
        // height: 3000px;
        // background-color: rgb(153, 153, 95);
        .cate {
          display: flex;
          justify-content: flex-start;
          font: 20px/50px $fontF;
          >div:first-of-type {
            span {
              font-weight: bold;
              cursor: pointer;
              &:not(:last-of-type) {opacity: 0.85;}
            }
          }
          .cate-icon {
            font-size: 23px;
            opacity: 0.7;
            cursor: pointer;
            &:hover {opacity: 1;}
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
              &:hover {opacity: 0.9;}
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
            background-color: rgb(245,245,245);
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
              font:  20px/23px $fontF;
              opacity: 0.9;
            }
            .article-frag {
              margin: 10px 0 20px;
              width: 100%;
              white-space: wrap;
              height: 50px;
              font: 17px/25px $fontF;
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
                    background-color: rgb(235, 177, 71);
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
      }  
    }
  }

</style>