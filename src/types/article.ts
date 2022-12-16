export enum ArticleState {
  PUBLIC, // 公开
  PRIVATE, // 私有
  DELETE, // 已删除
}

export interface ArticleListItem {
  title: string;
  briefIntroduction: string; // 简介
  nickName: string;
  iconUrl: string;
  userId: string;
  aId: string;
  updateDate: number;
  // 后续还有标签等
}
