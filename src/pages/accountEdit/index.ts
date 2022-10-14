import Block from '../../utils/block';
import './accountEdit.css';

import Validator, { ValidationType } from '../../utils/validation';

export class AccountEdit extends Block {
  protected getStateFromProps() {
    this.state = {
      onSave: () => {
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

          if ((input.name) === 'email') {
            this.refs.email.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }

          if ((input.name) === 'first_name') {
            this.refs.first_name.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }

          if ((input.name) === 'second_name') {
            this.refs.second_name.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }

          if ((input.name) === 'display_name') {
            this.refs.display_name.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }

          if ((input.name) === 'phone') {
            this.refs.phone.refs.error.setProps({
              isValid: flag,
              validateMessage: text,
            });
          }
        });

        console.log('inputs/AccountEdit', loginData);
      },

    };
  }

  render() {
    // language=hbs
    return `
      {{#AccountLayout}}
        {{#Form  formWrap="form-account-wrap"}}

          {{#Avatar styles="avatar-default"}}
            <label for="avatar" class="input-avatar-label">Поменять аватар</label>
            <input type="file" class="input-avatar" id="avatar" name="avatar">
          {{/Avatar}}

          {{{AccountInput title="Почта"
                          styles="account-input"
                          type="email"
                          name="email"
                          placeholder="pupkin@yandex.ru"
                          ref="email"
                          id="email"
                          onFocus=onFocus
                          onBlur=onBlur
                          onChange=onChange
          }}}

          {{{AccountInput title="Логин"
                          styles="account-input"
                          type="text"
                          name="login"
                          placeholder="pupkin"
                          ref="login"
                          id="login"
                          onFocus=onFocus
                          onBlur=onBlur
                          onChange=onChange
          }}}
          
          {{{AccountInput title="Имя"
                          styles="account-input"
                          type="text"
                          name="first_name"
                          placeholder="Василий"
                          ref="first_name"
                          id="first_name"
                          onFocus=onFocus
                          onBlur=onBlur
                          onChange=onChange
          }}}

        {{{AccountInput title="Фамилия"
                        styles="account-input"
                        type="text"
                        name="second_name"
                        placeholder="Пупкин"
                        ref="second_name"
                        id="second_name"
                        onFocus=onFocus
                        onBlur=onBlur
                        onChange=onChange
        }}}

        {{{AccountInput title="Имя в чате"
                        styles="account-input"
                        type="text"
                        name="display_name"
                        placeholder="Василий"
                        ref="display_name"
                        id="display_name"
                        onFocus=onFocus
                        onBlur=onBlur
                        onChange=onChange
        }}}

          {{{AccountInput title="Телефон"
                          styles="account-input"
                          type="phone"
                          name="phone"
                          placeholder="8 (909) 967 30 30"
                          ref="phone"
                          id="phone"
                          onFocus=onFocus
                          onBlur=onBlur
                          onChange=onChange
          }}}
          

        {{{Button label="Сохранить"
                  styles="button-form"
                  background="button-background-main"
                  onClick=onSave
        }}}
          

        {{/Form}}

      {{/AccountLayout}}

    `;
  }
}
