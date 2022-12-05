<template>
  <div class="test">
    <ul>
      <li><router-link to="/user/account/login">登录</router-link></li>
      <li><router-link to="/user/account/register">注册</router-link></li>
    </ul>
  </div>
  <router-view />
</template>
<style lang="less" scoped>
.test {
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 10000;
}
</style>
