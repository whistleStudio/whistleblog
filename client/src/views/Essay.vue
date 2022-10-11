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
            <span>Vue</span>
            <span class="cate-icon" :class="{'cate-icon-exp': isCateExp}" @click="cateIconClick(1)">&nbsp;{{isCateExp ? '|' : '➡'}}</span>
          </div>
          <ul v-if="isCateExp" class="flex-center">
            <li>JavaScrpit</li>
            <li>NodeJs</li>
            <li>TypeScript</li>
            <li>Vue</li>
            <li class="cate-icon" @click="cateIconClick(0)">⬅</li>
          </ul>
        </div>
        <ul>
          <li v-for="(v, i) in 10"></li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import router from '@/router';
  import { onMounted, ref} from "vue"
  let kwIp = ref<any>(null)
  let isCateExp = ref<boolean>(false)
  /* 回到主页 */  
  function logoClick () {
    router.push("/")
  }
  /* 目录展开/折叠 */
  function cateIconClick (exp: number) {
    if (exp) isCateExp.value = true
    else isCateExp.value = false
  }
  /* ---------------------- */
  onMounted(() => {
    // 默认输入框聚焦
    kwIp?.value?.focus()
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
        }
        >span {
          display: inline-block;
          font: 50px/70px $fontF;
          margin-right: 20px;
        }
        input {
          flex: 1;
          font: 30px/35px $fontF;
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
        height: 600px;
        // background-color: rgb(153, 153, 95);
        .cate {
          float: left;
          font: 20px/40px $fontF;
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
        >ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          >li {
            $width: 32.9%;
            width: $width;
            height: 150px;
            background-color: rgb(245,245,245);
            // border: 1px solid black;
            margin-bottom: calc((100% - $width * 3) / 2);
            &:not(:nth-of-type(3n)) {
              margin-right: calc((100% - $width * 3) / 2);
            }
          }
        }
      }  
    }
  }

</style>