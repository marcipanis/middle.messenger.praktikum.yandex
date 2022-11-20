import Block from '../../utils/block';
import AuthController, { ControllerRegistrationData } from '../../controllers/loginController';
import { Validation } from '../../utils/validation';
import { withUser } from '../../utils/store';

interface RegistrationDataProps {
  onReg: () => void;
}

export class RegistrationBase extends Block<RegistrationDataProps> {
  constructor({ ...props }: RegistrationDataProps) {
    super({
      ...props,
      onReg: () => this.onReg(),
    });
  }

  async onReg() {
    // validation there
    const element = this.getContent();
    const inputs = element?.querySelectorAll('input');
    const [loginData, isValid] = Validation(inputs, this.refs);

    if (isValid) {
      await AuthController.registration(loginData as unknown as ControllerRegistrationData);
    }
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
            name="repeatPassword"
            placeholder="Пароль"
            ref="repeatPassword"
            id="repeatPassword"
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
            href="/"}}}
        
      {{/Form}}
    `;
  }
}

export const Registration = withUser(RegistrationBase);
