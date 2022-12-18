<script setup lang="ts">
import { ref } from 'vue';
import navBar from '../../../components/nav-bar/index.vue'

const navList = [
  { title: '首页', key: '1', },
  { title: '模块2', key: '1', },
  { title: '模块3', key: '1', },
  { title: '模块4', key: '1', },
  { title: '跳转', key: '1', },
]

const activeIndex = ref(0)

function change(index: number) {
  activeIndex.value = index;
}

</script>
<template>
  <div class="header">
    <div class="centent">
      <a class="logo">
        <img src="" alt="" srcset="">
        logo
      </a>
      <nav-bar :navList="navList" :activeIndex="activeIndex" @change="change" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.header {
  background-color: #fff;

  .centent {
    border: 1px solid #eaeaea;
    max-width: 1440px;
    margin: 0 auto;
    height: 60px;

    display: flex;

    .logo {
      width: 100px;
    }
  }
}
</style>
