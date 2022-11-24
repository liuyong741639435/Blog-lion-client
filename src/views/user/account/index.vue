<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useLogin, useRegister } from "./account";
const login = useLogin();
const register = useRegister();
// 公共的一会要单独提出来
const state = ref('register');

function te() {
  state.value = state.value === 'register' ? 'login' : 'register'
}

</script>
<template>
  <div class="content">
    <!-- <img class="bg" /> -->
    <a-button type="primary" @click="te">[{{ state }}]</a-button>
    <div :class="`login ${state === 'login' ? 'curr' : 'hide'}`">
      <h1>登录</h1>
      <a-form :model="login.formState" name="basic" autocomplete="off" :rules="login.rules"
        @finish="login.handleFinish">
        <a-form-item name="userName">
          <a-input v-model:value="login.formState.userName">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password v-model:value="login.formState.password" autocomplete="off">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="login.formState.remember">Remember</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div :class="`register ${state === 'register' ? 'curr' : 'hide'}`">
      <h1>注册</h1>
      <a-form :model="register.formState" name="basic" autocomplete="off" :rules="register.rules"
        @finish="register.handleFinish">
        <a-form-item name="userName">
          <a-input v-model:value="register.formState.userName">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password v-model:value="register.formState.password" autocomplete="off">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style lang="less" scoped>
.content {
  width: 1200px;
  background-color: #fff;
  min-height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 2px 10px 0px rgba(61, 68, 82, 0.22);

  .login,
  .register {
    background-color: #fff;
    text-align: left;
    width: 400px;
    height: 400px;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0px 2px 10px 0px rgba(61, 68, 82, 0.22);
    border-radius: 10px;
    padding: 20px;
    z-index: 1;
    transition-duration: 1s;

    h1 {
      margin: 20px;
      text-align: center;
    }
  }

  .curr {}

  .hide {
    transform: rotateY(180deg) translateY(-50%);
    z-index: 0;
  }
}
</style>
