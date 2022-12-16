import request from "../utils/request";

// 后续要有iconUrl头像链接，nickName用户昵称等， 服务器还未实现
interface UserRelationsResBase {
  userId: string; // 用户id
  iconUrl: string;
  nickName: string;
}
interface UserRelationsRes {
  fans: UserRelationsResBase[]; // 粉丝
  followers: UserRelationsResBase[]; // 关注
  friends: UserRelationsResBase[]; // 共同好友
}

export interface CommentListItem {
  id: string;
  aId: string;
  userId: string;
  parentId: string;
  nickName: string;
  iconUrl: string;
  content: string;
  date: string;
  children?: CommentListItem[];
}

// 查询用户关系
export const apiGetUserRelations = (data: { userId?: string }) =>
  request.get<any, API.Response<UserRelationsRes>>(
    "/interactionBetweenUsers/getUserRelations",
    {
      params: data,
    }
  );
// 读取评论
export const apiGetComment = (data: { aId: string }) =>
  request.get<any, API.Response<CommentListItem>>(
    "/interactionBetweenUsers/getComment",
    {
      params: data,
    }
  );
