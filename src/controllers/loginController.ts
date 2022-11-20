import AuthAPI, { RegistrationData, LoginData } from '../api/loginApi';
import ChatsController from './chatsController';
import store from '../utils/store';
import Router, { routes } from '../utils/router';

export interface ControllerRegistrationData extends RegistrationData {
  repeatPassword: string;
}

class AuthController {
  private api: AuthAPI;

  private router: Router;

  constructor() {
    this.api = new AuthAPI();
    this.router = new Router();
  }

  async registration(data: ControllerRegistrationData) {
    try {
      await this.api.registration(data);
      await this.fetchUser();
      this.router.go(routes.chats);
    } catch (e: any) {
      console.log('Ошибка запроса регистрации:', e);
    }
  }

  async login(data: LoginData) {
    try {
      await this.api.login(data);
      await this.fetchUser();
      await ChatsController.get();
      this.router.go(routes.chats);
    } catch (e: any) {
      console.log('Ошибка запроса при попытке логина:', e);
      if (e.reason === 'User already in system') {
        await this.fetchUser();
        await ChatsController.get();
        this.router.go(routes.chats);
      }
    }
  }

  async logout() {
    try {
      this.api.logout()
        .then(() => store.set('currentUser', null))
        .then(() => store.set('chats', null))
        .then(() => store.set('messages', null))
        .then(() => store.set('selected', null));
      this.router.go(routes.start);
    } catch (e: any) {
      console.log('Ошибка запроса logout:', e);
    }
  }

  async fetchUser() {
    const response = await this.api.read();
    store.set('currentUser', response);
  }
}

export default new AuthController();
