import { renderDOM, registerComponent } from './utils';

import { Login } from './pages/login';
import { LinkPage } from './pages/linknav';
import { Error } from './pages/error';
import { Account } from './pages/account';
import { Registration } from './pages/registration';
import { AccountChangePassword } from './pages/accountChangePassword';
import { AccountEdit } from './pages/accountEdit';
import { Chat } from './pages/chat';

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
import { ChatlistItem } from './components/chatlistItem';

require('babel-core/register');

registerComponent(Button);
registerComponent(Link);
registerComponent(Form);
registerComponent(Input);
registerComponent(WrappedInput);
registerComponent(AccountInput);
registerComponent(ErrorInput);
registerComponent(AccountLayout);
registerComponent(Avatar);
registerComponent(ChatlistItem);

const accountData = {
  dataName: 'Василий',
  data: [
    { name: 'Почта', value: 'pupkin@yandex.ru' },
    { name: 'Логин', value: 'pupkin' },
    { name: 'Имя', value: 'Василий' },
    { name: 'Фамилия', value: 'Пупкин' },
    { name: 'Имя в чате', value: 'Василий' },
    { name: 'Телефон', value: '8 (909) 976 43 34' },
  ],
};

const chatData = {
  accountName: 'Василий',
  chatlistItems: [
    {
      displayName: 'Илья', messageTime: '15:12', avatar: 'аватар', message: 'Друзья, у меня для вас особенный выпуск новостей!...', messageCount: '4',
    },
    {
      displayName: 'Design Destroyer', messageTime: 'Вт', avatar: '', message: 'В 2008 году художник Jon Rafman начал собирать...', messageCount: '',
    },
  ],
  isChat: true,
};

const linkArray = {
  variable: 'Hello world',
  links: [
    { title: 'Авторизация', styles: 'link ', href: '/login.html' },
    { title: 'Регистрация', styles: 'link ', href: '/registration.html' },
    { title: 'Страница 404', styles: 'link ', href: '/error.html' },
    { title: 'Страница 5**', styles: 'link ', href: '/error500.html' },
    { title: 'Список чатов и лента переписки', styles: 'link ', href: '/chat.html' },
    { title: 'Настройки пользователя', styles: 'link ', href: '/account.html' },
    { title: 'Настройки пользователя - редактировать профиль ', styles: 'link ', href: '/accountEdit.html' },
    { title: 'Настройки пользователя - смена пароля', styles: 'link ', href: '/accountChangePassword.html' },

  ],
};

const error404 = {
  title: '404',
  text: 'Не туда попали',
};

const error500 = {
  title: '500',
  text: 'Мы уже фиксим',
};

function getPage(pathname: string) {
  let app: any;

  if (pathname === '/') {
    app = new LinkPage(linkArray);
  } else if (pathname === '/login.html') {
    app = new Login();
  } else if (pathname === '/registration.html') {
    app = new Registration();
  } else if (pathname === '/error500.html') {
    app = new Error(error500);
  } else if (pathname === '/chat.html') {
    app = new Chat(chatData);
  } else if (pathname === '/account.html') {
    app = new Account(accountData);
  } else if (pathname === '/accountChangePassword.html') {
    app = new AccountChangePassword();
  } else if (pathname === '/accountEdit.html') {
    app = new AccountEdit();
  } else {
    app = new Error(error404);
  }
  return app;
}

window.addEventListener('DOMContentLoaded', () => {
  const App = getPage(window.location.pathname);
  // console.log(App);
  renderDOM(App);
});
