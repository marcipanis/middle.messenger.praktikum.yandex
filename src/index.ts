import { registerComponent } from './utils';
import Router, { routes } from './utils/router';
import AuthController from './controllers/loginController';
import ChatsController from './controllers/chatsController';
import store from './utils/store';

import { Login } from './pages/login';
import { Error } from './pages/error';
import { Account } from './pages/account';
import { Registration } from './pages/registration';
import { AccountChangePassword } from './pages/accountChangePassword';
import { AccountEdit } from './pages/accountEdit';
import { Chats } from './pages/chats';

import './main.css';

import { Button } from './components/button';
import { Link } from './components/link';
import { Form } from './components/form';
import { Input } from './components/input';
import { WrappedInput } from './components/wrappedInput';
import { AccountInput } from './components/accountInput';
import { ErrorInput } from './components/errorInput';
import { AccountLayout } from './components/accountPage';
import { Avatar } from './components/avatar';
import { Chatlist } from './components/chatlist';
import { ChatlistItem } from './components/chatlistItem';
import { Chat } from './components/chat';
import { Message } from './components/chatMessage';
import { Modal } from './components/modal';

require('babel-core/register');

document.addEventListener('DOMContentLoaded', async () => {
  registerComponent(Button);
  registerComponent(Link);
  registerComponent(Form);
  registerComponent(Input);
  registerComponent(WrappedInput);
  registerComponent(AccountInput);
  registerComponent(ErrorInput);
  registerComponent(AccountLayout);
  registerComponent(Avatar);
  registerComponent(Chatlist);
  registerComponent(ChatlistItem);
  registerComponent(Chat);
  registerComponent(Message);
  registerComponent(Modal);

  const router = new Router();
  const routesValues = Object.values(routes);

  router
    .use(routes.start, Login)
    .use(routes.registration, Registration)
    .use(routes.account, Account)
    .use(routes.accountEdit, AccountEdit)
    .use(routes.accountChangePassword, AccountChangePassword)
    .use(routes.chats, Chats)
    .use(routes.error, Error);

  let isNeedAuth = true;

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case routes.start:
    case routes.registration:
      isNeedAuth = false;
      break;
  }

  if (routesValues.includes(window.location.pathname as routes)) {
    try {
      await AuthController.fetchUser();
      await ChatsController.get();
      router.start();

      if (!isNeedAuth) {
        router.go(routes.chats); // account
      }
    } catch (e) {
      console.log('Ошибка запроса при попытке найти пользователя:', e);
      store.set('currentUser', null);
      router.start();

      if (isNeedAuth) {
        router.go(routes.start);
      }
    }
  } else {
    console.log('404', window.location.pathname);
    router.start();
    router.go(routes.error);
  }
});
