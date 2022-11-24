import { createApp } from "vue";
import "./styles/index.css";
import 'ant-design-vue/dist/antd.css';
import ant from "ant-design-vue"
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(ant).use(router).mount("#app")
