import { message } from "ant-design-vue";
import { onBeforeUnmount, ref, Ref, shallowRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ApiGetArticleByUser,
  ApiSetArticleState,
  ApiEditArticle,
} from "../../api/article";
import { ArticleState } from "../../types/article";
import { debounce } from "../../utils/tool";

export function useWangeEdit() {
  // 编辑器实例，必须用 shallowRef shallowRef只监听最外层数据变化
  const editorRef = shallowRef();
  // 内容HTML
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
  };
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

  return {
    editorRef,
    toolbarConfig,
    editorConfig,
    handleCreated,
    mode,
  };
}

export function useApi() {
  const tips = ref("");
  const route = useRoute();
  let aId = route.params.aId as string;
  const title = ref("title");
  const contentHtml = ref("<p><br></p>");
  const router = useRouter();

  // 获取文章详情
  function getArticle(aId: string, title: Ref<string>, content: Ref<string>) {
    ApiGetArticleByUser({
      aId,
    })
      .then((res) => {
        if (res.code === 0) {
          title.value = res.data?.title ?? "";
          content.value = res.data?.content ?? "";
        }
      })
      .catch((err) => console.error(err));
  }
  // 更新
  async function editArticle() {
    tips.value = "保存中...";
    ApiEditArticle({
      aId,
      title: title.value,
      content: contentHtml.value,
    })
      .then((res) => {
        if (res.code === 0) {
          tips.value = "保存至草稿箱";
          if (res.data?.aId) {
            aId = res.data.aId;
            router.push(`/edit/drafts/${aId}`);
          }
        } else {
          tips.value = "保存失败";
        }
      })
      .catch((err) => {
        tips.value = "保存失败";
        console.error(err);
      });
  }
  // 发布
  function publishArticle() {
    if (aId === undefined) return;
    ApiSetArticleState({
      aId,
      state: ArticleState.PUBLIC,
    }).then((res) => {
      if (res.code) {
        message.success("发布成功");
      } else {
        message.warn(res.msg);
      }
    });
  }
  // 页面有aid文章id，从服务器中获取一下草稿
  if (aId !== "") getArticle(aId, title, contentHtml);
  // 节流
  const debounceEditArticle = debounce(editArticle, 1000, false);
  watch([title, contentHtml], debounceEditArticle);

  return {
    title,
    contentHtml,
    getArticle,
    editArticle,
    publishArticle,
    tips,
  };
}
