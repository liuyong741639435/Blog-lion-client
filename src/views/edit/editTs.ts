import { onBeforeUnmount, ref, shallowRef, watch } from "vue";
import { ApiUpdateArticle } from "../../api/article"

export function useWangeEdit() {
    // 编辑器实例，必须用 shallowRef shallowRef只监听最外层数据变化
  const editorRef = shallowRef();
  // 内容HTML
  const title = ref("")
  const contentHtml = ref("")
  const toolbarConfig = {}
  const editorConfig = { placeholder: "请输入内容..." }
  const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
  const mode = "default"; // 或 'simple'

   // 组件销毁时，也及时销毁编辑器
   onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  watch(contentHtml, (value) => console.log(value))

  return {
    editorRef,
    title,
    contentHtml,
    toolbarConfig,
    editorConfig,
    handleCreated,
    mode,
  }
}

export function useApi() {
    // 更新
    function updateArticle() {
        ApiUpdateArticle({
            title: '',
            content: ''
        })
        .then((res) => {
            console.log('ApiUpdateArticle', res)
        })
        .catch((err) => {
            console.error(err)
        })
    }
    // 发布
    function publishArticle() {

    }

    return {
        updateArticle,
        publishArticle,
    }
}