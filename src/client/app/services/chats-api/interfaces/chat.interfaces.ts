export interface IChatResponse {
  id: number;
  avatar: string;
  created_by: number;
  title: string;
}

export interface IGetChatTokenResponse {
  token: string;
}
