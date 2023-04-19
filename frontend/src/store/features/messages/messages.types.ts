export type MessagesState = {
  chatID: string;
  companionID: string;
  companionName: string;
  messagesRequested: boolean;
  messages: IncomingHistoryMessage[];
  isLoading: boolean;
  messagesError: {
    status: boolean;
    value: null | any;
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
