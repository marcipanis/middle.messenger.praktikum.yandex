import template from "./index.hbs";

import { login } from "./pages/login";
import { error } from "./pages/error";
import { registration } from "./pages/registration";
import { chat } from "./pages/chat";
import { account } from "./pages/account";
import { account_change_password } from "./pages/account_change_password";
import { account_edit } from "./pages/account_edit";

import "./components/button";
import "./components/link";
import "./components/input";
import "./components/form";
import "./components/account_page";
import "./components/account_input";
import "./components/avatar";

const accountdata = {
  dataname: "Василий",
  data: [
    { name: "Почта", value: "pupkin@yandex.ru" },
    { name: "Логин", value: "pupkin" },
    { name: "Имя", value: "Василий" },
    { name: "Фамилия", value: "Пупкин" },
    { name: "Имя в чате", value: "Василий" },
    { name: "Телефон", value: "8 (909) 976 43 34" },
  ],
};

const switcher = (app, pathname) => {
  if (pathname === "/") {
    app.innerHTML = template({ variable: "Hello world" });
  } else if (pathname === "/login.html") {
    app.innerHTML = login();
  } else if (pathname === "/registration.html") {
    app.innerHTML = registration();
  } else if (pathname === "/error500.html") {
    app.innerHTML = error({ title: "500", text: "Мы уже фиксим" });
  } else if (pathname === "/chat.html") {
    app.innerHTML = chat();
  } else if (pathname === "/account.html") {
    app.innerHTML = account(accountdata);
  } else if (pathname === "/account_change_password.html") {
    app.innerHTML = account_change_password();
  } else if (pathname === "/account_edit.html") {
    app.innerHTML = account_edit();
  } else {
    app.innerHTML = error({ title: "404", text: "Не туда попали" });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");
  switcher(app, window.location.pathname);
});
