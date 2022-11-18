import AuthController from './loginController';
import Router, { routes } from '../utils/router';
import AccountAPI, { AccountData, AccountPasswordData } from '../api/accountApi';

class AccountController {
  private api: AccountAPI;

  private router: Router;

  constructor() {
    this.api = new AccountAPI();
    this.router = new Router();
  }

  async changeAccount(data: AccountData) {
    try {
      await this.api.changeAccount(data);
      await AuthController.fetchUser();
      this.router.go(routes.account);
    } catch (e: any) {
      console.log('Ошибка запроса обновления данных:', e);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await this.api.changeAvatar(data);
      await AuthController.fetchUser();
    } catch (e: any) {
      console.log('Ошибка запроса обновления аватара:', e);
    }
  }

  async changePassword(data: AccountPasswordData) {
    try {
      await this.api.changePassword(data);
      await AuthController.fetchUser();
      this.router.go(routes.account);
    } catch (e: any) {
      console.log('Ошибка запроса обновления пароля:', e);
    }
  }

  async search(login: string) {
    try {
      return await this.api.search(login);
    } catch (e: any) {
      console.log('Ошибка поиска логина:', e);
      return [];
    }
  }

  async back() {
    try {
      this.router.back();
    } catch (e: any) {
      console.log('Ошибка перехода страницы', e);
    }
  }

  async toCharts() {
    try {
      this.router.go(routes.chats);
    } catch (e: any) {
      console.log('Ошибка перехода страницы', e);
    }
  }

  async toAccount() {
    try {
      this.router.go(routes.account);
    } catch (e: any) {
      console.log('Ошибка перехода страницы', e);
    }
  }
}

export default new AccountController();
