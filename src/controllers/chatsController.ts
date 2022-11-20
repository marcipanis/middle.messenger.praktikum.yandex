import ChatsAPI, { ChatData } from '../api/chatsApi';
import store from '../utils/store';
import { getDatetime } from '../utils/functions';

import { ChatWebSocket } from '../utils/websocketTransport';

class ChatsController {
  private readonly api: ChatsAPI;

  private webSocket:ChatWebSocket | null = null;

  constructor() {
    this.api = new ChatsAPI();
  }

  async get(rewrite = false, title = '') {
    try {
      const chatList = await this.api.read(0, 50, title);
      const chats: Record<string, ChatData> = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const chat of chatList) {
        if (chat.last_message) {
          const day = new Date(chat.last_message.time);
          chat.last_message.time = getDatetime(day);
        }
        // eslint-disable-next-line no-await-in-loop
        chat.user_list = await this.api.getUsers(chat.id);
        chat.selected = store.getState().selected?.selectedChat === chat.id;
        chats[chat.id] = chat;
      }

      store.set('chats.chatList', chats, rewrite);
    } catch (e: any) {
      console.log('Ошибка запроса при попытке получить чаты:', e);
    }
  }

  async search(title:string) {
    try {
      const searchValue = await this.get(true, title);
      store.set('selected.searchValue', title, false);
      return searchValue;
    } catch (e: any) {
      console.log('Ошибка запроса при попытке поиска чата:', e);
      return null;
    }
  }

  async create(title:string) {
    try {
      const chat = await this.api.create(title);
      await this.get();
      await this.select(chat.id);
      return chat.id;
    } catch (e: any) {
      console.log('Ошибка запроса при попытке создать чат:', e);
      return null;
    }
  }

  async changeAvatar(chatId:number, data: FormData) {
    try {
      data.append('chatId', chatId.toString());
      await this.api.changeAvatar(data).then(async () => {
        await this.get(true);
      });
    } catch (e: any) {
      console.log('Ошибка смены аватара:', e);
    }
  }

  async getToken(chatId: number) {
    try {
      const token = await this.api.getToken(chatId);
      return token.token;
    } catch (e: any) {
      console.log('Ошибка получения токена:', e);
      return null;
    }
  }

  async getSocket(chatId: number) {
    try {
      if (store.getState().currentUser !== undefined) {
        const userId = store.getState().currentUser?.id;
        const token = await this.getToken(chatId);
        if (userId && chatId && token) {
          this.webSocket = new ChatWebSocket(userId.toString(), chatId.toString(), token);
        }
      }
    } catch (e: any) {
      console.log('Ошибка получения сокета:', e);
    }
  }

  async addUsers(chatId: number, users: number[]) {
    try {
      await this.api.addUsers(chatId, users);
      await this.get(true);
    } catch (e: any) {
      console.log('Ошибка добавления пользователя:', e);
    }
  }

  async deleteUsers(chatId: number, users: number[]) {
    try {
      await this.api.deleteUsers(chatId, users);
      await this.get(true);
    } catch (e: any) {
      console.log('Ошибка удаления пользователя:', e);
    }
  }

  select(chatId: number) {
    this.getSocket(chatId).then(() => {
      store.set('selected.selectedChat', chatId);
      this.get().then();
    });
  }

  unselectAll() {
    store.set('socket', null);
    store.set('selected.selectedChat', null);
  }

  async sendMessage(message: string) {
    try {
      if (this.webSocket) {
        this.webSocket.sendMessage(message);
        await this.get();
      }
    } catch (e:any) {
      console.log('Ошибка отправки сообщения:', e);
    }
  }

  delete(chatId:number) {
    try {
      this.api.delete(chatId).then(
        async () => {
          this.unselectAll();
          await this.get(true);
        },
      );
    } catch (e: any) {
      console.log('Ошибка удаления чата:', e);
    }
  }

  getChatWebSocket() {
    return this.webSocket;
  }
}

export default new ChatsController();
