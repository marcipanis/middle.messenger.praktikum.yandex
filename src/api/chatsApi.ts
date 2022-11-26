import BaseAPI from './baseApi';
import { UserData } from './loginApi';
import { ContentType } from '../utils/httpTransport';

export interface ChatData {
    selected: boolean;
    chat: Promise<(UserData & { role: string; })[]>;
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: UserData,
        time: string;
        content: string;
    },
    user_list?: UserData[]
}

export interface MessageData {
    id: number;
    user_id: string;
    chat_id: string;
    content: string;
    is_read: false;
    time: string;
    type: string;
}

export interface ChatMessages {
    list: MessageData[]
}

export interface SelectedData {
    selectedChat?: number;
    searchValue?: string;
}

export default class ChatsApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  create(title: string): Promise<{id:number}> {
    return this.http.post('/', { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id });
  }

  read(offset = 0, limit = 50, title = ''): Promise<ChatData[]> {
    return this.http.get(`?offset=${offset}&limit=${limit}&title=${title}`);
  }

  getUsers(id: number): Promise<Array<UserData & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  async getToken(id: number): Promise<{ token: string }> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.http.post<{ token: string }>(`/token/${id}`);
  }

  changeAvatar(data: any): Promise<ChatData> {
    return this.http.put('/avatar', data, ContentType.formData);
  }

  deleteUsers(chatId: number, users: number[]) {
    return this.http.delete('/users', { chatId, users });
  }

  update = undefined;
}
