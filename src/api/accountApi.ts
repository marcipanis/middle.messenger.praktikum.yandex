import BaseAPI from './baseApi';
import { RegistrationData } from './loginApi';
import { ContentType } from '../utils/httpTransport';

export interface AccountData extends RegistrationData {
    display_name?: string,
    avatar?: string;
}

export interface AccountPasswordData{
    oldPassword:string,
    newPassword:string
}

export default class AccountAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeAccount(data: AccountData): Promise<unknown> {
    return this.http.put('/profile', data);
  }

  changePassword(data: AccountPasswordData): Promise<unknown> {
    return this.http.put('/password', data);
  }

  changeAvatar(data: FormData): Promise<unknown> {
    return this.http.put('/profile/avatar', data, ContentType.formData);
  }

  search(login: string): Promise<unknown> {
    return this.http.post('/search', { login });
  }

  read(id: number): Promise<unknown> {
    return this.http.get(`/${id}`);
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}
