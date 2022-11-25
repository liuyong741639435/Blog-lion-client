<script setup lang="ts">
// icon图标
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useAccount } from "./account";
import { AccountPage } from "../../../types/user";

const {
  pageState,
  changePageState,
  formRegister,
  submitRegisterDebounce,
  formLogin,
  submitLoginDebounce,
  rules,
  buttonDisabled,
} = useAccount();
</script>
<template>
  <div class="content">
    <!-- <img class="bg" /> -->
    <div
      :class="`register ${pageState === AccountPage.REGISTER ? '' : 'hide'}`"
    >
      <h1>注册</h1>
      <a class="changePageState" @click="changePageState">登录</a>
      <a-form
        :model="formRegister"
        name="basic"
        autocomplete="off"
        :rules="rules"
        @finish="submitLoginDebounce"
      >
        <a-form-item name="userName">
          <a-input v-model:value="formRegister.userName">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password
            v-model:value="formRegister.password"
            autocomplete="off"
          >
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="buttonDisabled"
            block
            >注册</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <div :class="`login ${pageState === AccountPage.LOGIN ? '' : 'hide'}`">
      <h1>登录</h1>
      <a class="changePageState" @click="changePageState">注册</a>
      <a-form
        :model="formLogin"
        name="basic"
        autocomplete="off"
        :rules="rules"
        @finish="submitLoginDebounce"
      >
        <a-form-item name="userName">
          <a-input v-model:value="formLogin.userName">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password
            v-model:value="formLogin.password"
            autocomplete="off"
          >
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="formLogin.remember">Remember</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="buttonDisabled"
            block
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style lang="less" scoped>
.content {
  width: 1000px;
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
    width: 320px;
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
  .hide {
    transform: rotateY(180deg) translateY(-50%);
    z-index: 0;
  }
  .changePageState {
    position: absolute;
    font-size: 12px;
    top: 20px;
    right: 20px;
  }
}
</style>
