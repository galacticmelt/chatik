export type CurrentChatState = {
  chatId: string;
  companionId: string;
  companionName: string;
  messagesRequested: boolean;
  messages: IncomingHistoryMessage[];
  messagesLoading: boolean;
  messagesError: {
    status: boolean;
    value: null | unknown;
  };
  initNewChatError: {
    status: boolean;
    value: null | unknown;
  };
};

export type IncomingHistoryMessage = {
  _id: string;
  sender: string;
  chatId: string;
  text: string;
  createdAt: string;
};

export interface OutcomingHistoryMessage {
  chatId: string;
  sender: string;
  text: string;
}
