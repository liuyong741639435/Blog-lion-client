import { RuleObject } from "ant-design-vue/lib/form";
import { onMounted, reactive, ref, toRaw } from "vue";
import { apiLogin, apiRegister } from "../../../api/user";
import { debounce } from "../../../utils/tool";
import { message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { AccountPage } from "../../../types/user";

// 校验配置
const rules = {
  userName: [
    {
      validator: (rule: RuleObject, value: string, cb: Function) => {
        if (!/^[A-Za-z0-9]{4,12}$/.test(value)) {
          cb("请输入4-12位由大小写字母和数字");
        } else {
          cb();
        }
      },
      trigger: "blur",
    },
  ],
  password: [
    {
      validator: (rule: RuleObject, value: string, cb: Function) => {
        if (!/^[A-Za-z0-9]{4,12}$/.test(value)) {
          cb("请输入4-12位由大小写字母和数字");
        } else {
          cb();
        }
      },
      trigger: "blur",
    },
  ],
};

export function useAccount() {
  // 路由相关
  const route = useRoute();
  const router = useRouter();
  // 页面相关
  const pageState = ref(AccountPage.LOGIN);
  const buttonDisabled = ref(false);
  function changePageState() {
    pageState.value =
      pageState.value === AccountPage.REGISTER
        ? AccountPage.LOGIN
        : AccountPage.REGISTER;
    router.push(`/user/account/${pageState.value}`);
  }
  // 注册相关
  const formRegister = reactive({
    userName: "",
    password: "",
  });
  // 点击submit 校验成功之后，会调用
  const submitRegisterDebounce = debounce(function () {
    buttonDisabled.value = true;
    apiRegister({
      userName: formRegister.userName,
      password: formRegister.password,
    })
      .then((res) => {
        if (res.code === 0) {
          message.success("注册成功");
          // rou
        } else {
          message.warning(res.msg);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => (buttonDisabled.value = false));
  });
  // 登录相关
  const formLogin = reactive({
    userName: "",
    password: "",
    remember: false,
  });

  // 本地存储
  function setLogin(data: any) {
    if (formLogin.remember) localStorage.setItem("login", JSON.stringify(data));
  }

  // 本地读取
  (function gtLogin() {
    const str = localStorage.getItem("login");
    try {
      if (str) {
        const data = JSON.parse(str);
        formLogin.userName = data.userName;
        formLogin.password = data.password;
        formLogin.remember = data.remember;
      }
    } catch (error) {
      console.error(error);
    }
  })();

  // 点击submit 校验成功之后，会调用
  const submitLoginDebounce = debounce(function () {
    const data = toRaw(formLogin);
    setLogin(data);
    buttonDisabled.value = true;
    apiLogin({
      userName: formLogin.userName,
      password: formLogin.password,
    })
      .then((res) => {
        if (res.code === 0) {
          message.success("登录成功");
          
          router.push("/edit/drafts");
        } else {
          message.warning(res.msg);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => (buttonDisabled.value = false));
  });

  // 挂载后
  onMounted(() => {
    const state = route.params.pageState as AccountPage;
    if (state) pageState.value = state;
  });
  return {
    pageState,
    changePageState,
    formRegister,
    submitRegisterDebounce,
    formLogin,
    submitLoginDebounce,
    rules,
    buttonDisabled,
  };
}
