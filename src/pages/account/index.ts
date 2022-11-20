import Block from '../../utils/block';
import { withUser } from '../../utils/store';
import { AccountData } from '../../api/accountApi';
import AuthController from '../../controllers/loginController';
import AccountController from '../../controllers/accountController';

interface AccountBaseProps extends AccountData{
  onLogout?: () => void;
  onClick?: () => void;
}

class AccountBase extends Block<AccountBaseProps> {
  constructor({ ...props }: AccountBaseProps) {
    super({
      ...props,
      onLogout: () => AuthController.logout(),
      onClick: () => AccountController.toCharts(),
    });
  }

  render() {
    // language=hbs
    return `
      {{#AccountLayout onClick = onClick}}
        {{#Form  formWrap="form-account-wrap"}}

          {{{Avatar styles="avatar-default" avatar=avatar }}}

          <span class="form-account-title">  {{ login }} </span>

          <ul class="account-input-wrap">
           
              <li class="account-input-wrap">
                <div class="account-input-label-wrap">
                  <span class="account-input-label">Почта</span>
                  <span class="account-input">{{email}}</span>
                </div>
                <div class="account-input-border"></div>
              </li>
              <li class="account-input-wrap">
                  <div class="account-input-label-wrap">
                      <span class="account-input-label">Логин</span>
                      <span class="account-input">{{login}}</span>
                  </div>
                  <div class="account-input-border"></div>
              </li>
              <li class="account-input-wrap">
                  <div class="account-input-label-wrap">
                      <span class="account-input-label">Имя</span>
                      <span class="account-input">{{first_name}}</span>
                  </div>
                  <div class="account-input-border"></div>
              </li>
              <li class="account-input-wrap">
                  <div class="account-input-label-wrap">
                      <span class="account-input-label">Фамилия</span>
                      <span class="account-input">{{second_name}}</span>
                  </div>
                  <div class="account-input-border"></div>
              </li>
              <li class="account-input-wrap">
                  <div class="account-input-label-wrap">
                      <span class="account-input-label">Имя в чате</span>
                      <span class="account-input">{{display_name}}</span>
                  </div>
                  <div class="account-input-border"></div>
              </li>
              <li class="account-input-wrap">
                  <div class="account-input-label-wrap">
                      <span class="account-input-label">Телефон</span>
                      <span class="account-input">{{phone}}</span>
                  </div>
                  <div class="account-input-border"></div>
              </li>
          </ul>

          <div class="link-wrap">
            {{{Link title="Изменить данные"
                     styles="link link-decor-marine"
                     href="/accountEdit"
                     linkBorder="link-decor-border"}}}

            {{{Link title="Изменить пароль"
                     styles="link link-decor-marine"
                     href="/accountChangePassword"
                     linkBorder="link-decor-border"}}}
                
            {{{Button label="Выйти" styles="link link-decor-red" onClick=onLogout}}}
            
          </div>

        {{/Form}}

      {{/AccountLayout}}

    `;
  }
}

export const Account = withUser(AccountBase);
