import Block from '../../utils/block';

import { Validation } from '../../utils/validation';

export class Registration extends Block {
  protected getStateFromProps() {
    this.state = {
      onReg: () => {
        // validation there
        const element = this.getContent();
        const inputs = element?.querySelectorAll('input');
        const loginData = Validation (inputs, this.refs);

        console.log('inputs/registration', loginData);
      },

    };
  }

  render() {
    // language=hbs
    return `
      {{#Form  title="Регистрация" formWrap="form-login-wrap"}}

        {{{WrappedInput title="Почта"
            styles="input input-icon-left input-email"
            type="email"
            name="email"
            placeholder="pupkin@yandex.ru"
            ref="email"
            id="email"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}

        {{{WrappedInput title="Логин"
            styles="input input-icon-left input-login"
            type="text"
            name="login"
            placeholder="pupkin"
            ref="login"
            id="login"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}

        {{{WrappedInput title="Имя"
            styles="input input-icon-left input-name"
            type="text"
            name="first_name"
            placeholder="Василий"
            ref="first_name"
            id="first_name"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}

        {{{WrappedInput title="Фамилия"
            styles="input input-icon-left input-name"
            type="text"
            name="second_name"
            placeholder="Пупкин"
            ref="second_name"
            id="second_name"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}

        {{{WrappedInput title="Телефон"
            styles="input input-icon-left input-phone"
            type="phone"
            name="phone"
            placeholder="8 (909) 967 30 30"
            ref="phone"
            id="phone"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}

        {{{WrappedInput title="Пароль"
            styles="input input-icon-left input-password"
            type="password"
            name="password"
            placeholder="Пароль"
            ref="password"
            id="password"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}

        {{{WrappedInput title="Пароль (еще раз)"
            styles="input input-icon-left input-password"
            type="password"
            name="repeat_password"
            placeholder="Пароль"
            ref="repeat_password"
            id="repeat_password"
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
        }}}

        {{{Button label="Зарегистрироваться"
            styles="button-form"
            background="button-background-main"
            onClick=onReg
        }}}

        {{{Link title="Войти"
            linkWrap="link-wrap"
            styles="link"
            href="/login.html"}}}
        
      {{/Form}}

    `;
  }
}
