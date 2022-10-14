import Block from '../../utils/block';

import Validator, { ValidationType } from '../../utils/validation';

export class AccountChangePassword extends Block {
  protected getStateFromProps() {
    this.state = {
      onReg: () => {
        // validation there
        const loginData: Record<string, unknown> = {};

        const element = this.getContent();
        const inputs = element?.querySelectorAll('input');

        Array.from(inputs).forEach((input) => {
          loginData[input.name] = input.value;
          const [flag, text] = Validator.validate(<ValidationType>input.name, input.value);

          if ((input.name) === 'password') {
            this.refs.password.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }

          if ((input.name) === 'old_password') {
            this.refs.old_password.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }

          if ((input.name) === 'repeat_password') {
            this.refs.repeat_password.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }
        });

        console.log('inputs/AccountChangePassword', loginData);
      },

    };
  }

  render() {
    // language=hbs
    return `
      {{#AccountLayout}}
        {{#Form  formWrap="form-account-wrap"}}

          {{{Avatar styles="avatar"}}}

          {{{AccountInput title="Старый пароль"
                          styles="account-input"
                          type="password"
                          name="old_password"
                          placeholder="Пароль"
                          ref="old_password"
                          id="old_password"
                          onFocus=onFocus
                          onBlur=onBlur
                          onChange=onChange
          }}}

        {{{AccountInput title="Пароль"
                        styles="account-input"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        ref="password"
                        id="password"
                        onFocus=onFocus
                        onBlur=onBlur
                        onChange=onChange
        }}}

        {{{AccountInput title="Пароль (еще раз)"
                        styles="account-input"
                        type="password"
                        name="repeat_password"
                        placeholder="Пароль"
                        ref="repeat_password"
                        id="repeat_password"
                        onFocus=onFocus
                        onBlur=onBlur
                        onChange=onChange
        }}}

        {{{Button label="Сохранить"
                  styles="button-form"
                  background="button-background-main"
                  onClick=onReg
        }}}
          

        {{/Form}}

      {{/AccountLayout}}

    `;
  }
}
