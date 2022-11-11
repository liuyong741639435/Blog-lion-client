// 每个接口的返回，都在这边定义
declare namespace API {
  // 常用的的泛型  与后端返回数据结构相关
  interface Response<T = any> {
    code: number;
    data: T;
    msg: string;
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
}
