import Block from '../../utils/block';

import { Validation } from '../../utils/validation';
import { withUser } from '../account';
import AccountController from '../../controllers/accountController';
import { AccountData } from '../../api/accountApi';
import { onAvatarChange } from '../../utils/functions';

interface AccountDataProps extends AccountData {
  onClick: () => void;
  onAvatarClick: () => void;
  onSave: () => void;
}

export class AccountEditBase extends Block<AccountDataProps> {
  private avatarData: unknown;

  constructor(props: AccountDataProps) {
    super({
      ...props,
      onClick: () => AccountController.toAccount(),
      onAvatarClick: async () => {
        this.avatarData = onAvatarChange('avatar');
      },
      onSave: async () => {
        // validation there
        const element = this.getContent();
        const inputs = element?.querySelectorAll('input');
        const [loginData, isValid] = Validation(inputs, this.refs);

        if (isValid) {
          if (this.avatarData instanceof FormData) {
            await AccountController.changeAvatar(this.avatarData);
          }
          await AccountController.changeAccount(loginData as unknown as AccountData);
        }
      },
    });
  }

  render() {
    // language=hbs
    return `
      {{#AccountLayout onClick = onClick}}
        {{#Form  formWrap="form-account-wrap" id="avatarForm"}}

          {{{Avatar id="avatar" styles="avatar-default" avatar=avatar edit=true onClick=onAvatarClick }}}

          <span class="form-account-title">  {{ login }} </span>

          {{{AccountInput title="Почта"
                          styles="account-input"
                          type="email"
                          name="email"
                          placeholder="pupkin@yandex.ru"
                          ref="email"
                          id="email"
                          value=email
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
                          value=login
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
                          value=first_name
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
                        value=second_name
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
                        value=display_name
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
                          value=phone
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

export const AccountEdit = withUser(AccountEditBase);
