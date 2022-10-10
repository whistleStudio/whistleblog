<!-- Essay -->
<template>
  <div class="essay flex-center">
    <div>
      <div class="search flex-center">
        <div class="logo" @click="logoClick"></div> <span>/</span>
        <input ref="kwIp" type="text" placeholder="关键词">
      </div>
      <div class="main">
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
  /* 回到主页 */  
  function logoClick () {
    router.push("/")
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
        background-color: rgb(153, 153, 95);
        >ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          >li {
            width: 32%;
            height: 150px;
            background-color: antiquewhite;
            // border: 1px solid black;
            margin-left: 1%;
            margin-bottom: 1%;
          }
        }
      }  
    }
  }

</style>