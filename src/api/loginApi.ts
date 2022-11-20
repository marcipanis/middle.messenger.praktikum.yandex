import BaseAPI from './baseApi';

export interface UserData {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export interface RegistrationData {
    first_name?: string;
    second_name?: string;
    login?: string;
    email?: string;
    password?: string;
    phone?: string;
}

export interface LoginData {
    login: string;
    password: string;
}

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  registration(data: RegistrationData): Promise<unknown> {
    return this.http.post('/signUp', data);
  }

  login(data: LoginData): Promise<unknown> {
    return this.http.post('/signIn', data);
  }

  logout(): Promise<unknown> {
    return this.http.post('/logout');
  }

  read(): Promise<unknown> {
    return this.http.get('/user');
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}
