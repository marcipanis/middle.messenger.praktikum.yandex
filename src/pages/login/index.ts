import Block from '../../utils/block';
import { Validation } from '../../utils/validation';

import AuthController from '../../controllers/loginController';
import { LoginData } from '../../api/loginApi';
import { withUser } from '../account';

export class LoginBase extends Block {
  constructor(...props: any) {
    super({ ...props });

    this.setProps({
      onLogin: this.onLogin.bind(this),
    });
  }

  async onLogin() {
    // validation there
    const element = this.getContent();
    const inputs = element?.querySelectorAll('input');
    const [loginData] = Validation(inputs, this.refs);

    await AuthController.login(loginData as unknown as LoginData);
  }

  render() {
    // language=hbs
    return `
      {{#Form  title="Вход" formWrap="form-login-wrap" id="loginForm"}}
        
        {{{WrappedInput
            title="Логин"
            ref="login"
            styles="input input-icon-left input-login"
            type="text"
            name="login"
            id="login"
            placeholder="Логин"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}

        {{{WrappedInput
            title="Пароль"
            ref="password"
            styles="input input-icon-left input-password"
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}
        
        {{{Button label="Авторизоваться"
            styles="button-form"
            background="button-background-main"
            onClick=onLogin
        }}}
        
        {{{Link title="Регистрация"
            linkWrap="link-wrap"
            styles="link"
            href="/registration"
        }}}

      {{/Form}}
      
    `;
  }
}

export const Login = withUser(LoginBase);
