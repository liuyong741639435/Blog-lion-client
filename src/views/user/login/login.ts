import { reactive } from "vue";

export function userForm() {
  const formState = reactive({
    username: "",
    password: "",
    remember: true,
  });
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return {
    formState,
    onFinish,
    onFinishFailed,
  };
}
