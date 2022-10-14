import Block from '../../utils/block';

import Validator, { ValidationType } from '../../utils/validation';

export class Login extends Block {
  protected getStateFromProps() {
    this.state = {
      onLogin: () => {
        // validation there
        const loginData: Record<string, unknown> = {};

        const element = this.getContent();
        const inputs = element?.querySelectorAll('input');

        Array.from(inputs).forEach((input) => {
          loginData[input.name] = input.value;
          const [flag, text] = Validator.validate(<ValidationType>input.name, input.value);

          if ((input.name) === 'login') {
            this.refs.login.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }
          if ((input.name) === 'password') {
            this.refs.password.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }
        });

        console.log('inputs/login', loginData);
      },

    };
  }

  render() {
    // language=hbs
    return `
      {{#Form  title="Вход" formWrap="form-login-wrap"}}
        
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
            href="/registration.html"
        }}}

      {{/Form}}
      
    `;
  }
}
