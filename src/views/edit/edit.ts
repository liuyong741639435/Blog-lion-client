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
import {
    IToolbarConfig,
    IEditorConfig,
    SlateElement,
} from "@wangeditor/editor";
import { ApiUpload } from "../../api/file";
import config from "../../config";

type ImageElement = SlateElement & {
    src: string;
    alt: string;
    url: string;
    href: string;
};
// 插入函数的类型;
type InsertFnType = (url: string, alt: string, href: string) => void;

export function useWangeEdit() {
    // 编辑器实例，必须用 shallowRef shallowRef只监听最外层数据变化
    const editorRef = shallowRef();
    // 2个配置 后续给到独立文件或者方法中定义 todo
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {};
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: "请输入内容...",
        MENU_CONF: {
            insertImage: {
                onInsertedImage(imageNode: ImageElement) {
                    // TS 语法
                    if (imageNode == null) return;

                    const { src, alt, url, href } = imageNode;
                    console.log("inserted image", src, alt, url, href);
                },
                // 上传图片的
            },
            uploadImage: {
                // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
                allowedFileTypes: ["image/*"],
                // 单个文件的最大体积限制，默认为 2M
                maxFileSize: 1 * 1024 * 1024, // 1M

                // 最多可上传几个文件，默认为 100
                maxNumberOfFiles: 1,
                // 自定义上传
                async customUpload(file: File, insertFn: InsertFnType) {
                    console.log("customUpload");
                    ApiUpload({ files: file }).then((res) => {
                        if (res.code === 0) {
                            // 自己实现上传，并得到图片 url alt href
                            // 最后插入图片
                            insertFn(`${config.uploadURL}${res.data[0].path}`, "alt", "href");
                        }
                    });
                },
            },
        },
        maxLength: 10000, // 最多文字 TIP 无特殊需求，请慎用 maxLength ，这可能会导致编辑器内容过多时，编辑卡顿。
        onMaxLength(editor) {
            // 当达到 maxlength 限制时，触发该回调函数
        },
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
    const title = ref("");
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
