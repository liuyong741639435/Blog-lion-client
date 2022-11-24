<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { userForm } from "./login";
const { formState, onFinish, onFinishFailed } = userForm();
</script>
<template>
  <div class="content">
    <div class="login">
      <h1>login</h1>
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        layout="horizontal"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            autocomplete="off"
          >
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="formState.remember"
            >Remember</a-checkbox
          >
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block>登录</a-button>
          <a-button block style="margin-top: 10px">注册</a-button>
        </a-form-item>
        <a-form-item>
          
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style lang="less" scoped>
.content {
  width: 1200px;
  background-color: #fff;
  min-height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  .login {
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

    h1 {
      margin: 20px;
      text-align: center;
    }
  }
}
</style>
