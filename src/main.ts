import { createApp } from "vue";
import "./styles/index.css";
import 'ant-design-vue/dist/antd.css';
import App from "./App.vue";
import router from "./router";
import { useComponents } from "./utils/useComponents";


const app = createApp(App);

useComponents(app) // 按需引入ui
app.use(router).mount("#app")
