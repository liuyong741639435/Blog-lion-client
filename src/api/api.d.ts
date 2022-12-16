// 每个接口的返回，都在这边定义
declare namespace API {
  // 常用的的泛型  与后端返回数据结构相关
  interface Response<T = any> {
    code: number;
    data: T | null;
    msg: string;
  }
  // 查询账号
  interface QueryUserName {
    userName: string;
  }
  // 注册
  interface Register {
    userName: string;
    password: string;
  }
  // 登录
  interface Login {
    userName: string;
    password: string;
  }

  interface GetArticle {
    aId: string;
  }
  // todo 后续用搜索代替
  interface GetArticleList {}

  interface EditArticle {
    aId?: string;
    title: string;
    content: string;
  }

  interface SetArticleState {
    aId: string;
    state: ArticleState;
  }

  interface UserInfo {
    nickName: string;
    jobTitle: string;
    company: string;
    blogAddress: string;
    description: string;
  }
}
