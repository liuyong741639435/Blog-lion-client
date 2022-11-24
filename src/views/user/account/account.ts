import { RuleObject } from "ant-design-vue/lib/form";
import { reactive, toRaw } from "vue";
import { apiLogin, apiRegister } from "../../../api/user";
export function useLogin() {
  const formState = reactive({
    userName: "",
    password: "",
    remember: false,
  });
  // 校验配置

  const rules = reactive({
    userName: [
      {
        validator: (rule: RuleObject, value: string, cb: Function) => {
          if (!/^[A-Za-z0-9]{4,12}$/.test(value)) {
            cb("账号格式不正确，请输入4-12位由大小写字母和数字");
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
            cb("密码格式不正确，请输入4-12位由大小写字母和数字");
          } else {
            cb();
          }
        },
        trigger: "blur",
      },
    ],
  });

  const handleFinish = () => {
    // 检验成功
    const data = toRaw(formState);
    setLogin(data);
    apiLogin(data);
  };

  // 本地存储
  function setLogin(data: any) {
    if (formState.remember) localStorage.setItem("login", JSON.stringify(data));
  }
  // 本地读取
  (function gtLogin() {
    const str = localStorage.getItem("login");
    try {
      if (str) {
        const data = JSON.parse(str);
        formState.userName = data.userName;
        formState.password = data.password;
        formState.remember = data.remember;
      }
    } catch (error) {}
  })()
  return {
    formState,
    rules,
    handleFinish,
  };
}
export function useRegister() {
  const formState = reactive({
    userName: "",
    password: "",
  });
  // 校验配置
  const rules = reactive({
    userName: [
      {
        validator: (rule: RuleObject, value: string, cb: Function) => {
          if (!/^[A-Za-z0-9]{4,12}$/.test(value)) {
            cb("账号格式不正确，请输入4-12位由大小写字母和数字");
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
            cb("密码格式不正确，请输入4-12位由大小写字母和数字");
          } else {
            cb();
          }
        },
        trigger: "blur",
      },
    ],
  });

  const handleFinish = () => {
    // 检验成功
    const data = toRaw(formState);
    apiRegister(data);
  };
  return {
    formState,
    rules,
    handleFinish,
  };
}
