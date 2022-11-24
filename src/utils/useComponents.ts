import { message, Button, Input, Form, Checkbox } from "ant-design-vue"

export function useComponents (app: any) {
    [Button, Input, Form, Checkbox].forEach((comp) => app.use(comp))
    app.config.globalProperties.$message = message;
}