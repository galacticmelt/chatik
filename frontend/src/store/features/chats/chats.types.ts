export type NormalizedChat = {
  chatID: string;
  companionID: string;
  companionName: string;
};

export type ChatsState = {
  chats: NormalizedChat[];
  isLoading: boolean;
  chatsError: {
    status: boolean;
    value: null | any;
  };
};
