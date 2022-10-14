import Block from '../../utils/block';

type AccountPageProps = {
  dataName: string;
  data: { name: string; value: string;}[];
}

export class Account extends Block {
  constructor({ dataName, data }: AccountPageProps) {
    super({ dataName, data });
  }

  render() {
    // language=hbs
    return `
      {{#AccountLayout}}
        {{#Form  formWrap="form-account-wrap"}}

          {{{Avatar styles="avatar-default"}}}

          <span class="form-account-title">  {{dataName}} </span>

          <ul class="account-input-wrap">
            {{#each data}}
              <li class="account-input-wrap">
                <div class="account-input-label-wrap">
                  <span class="account-input-label">{{this.name}}</span>
                  <span class="account-input">{{this.value}}</span>
                </div>
                <div class="account-input-border"></div>
              </li>
            {{/each}}
          </ul>

          <div class="link-wrap">
            {{{Link title="Изменить данные"
                     styles="link link-decor-marine"
                     href="/accountEdit.html"
                     linkBorder="link-decor-border"}}}

            {{{Link title="Изменить пароль"
                     styles="link link-decor-marine"
                     href="/accountChangePassword.html"
                     linkBorder="link-decor-border"}}}


            {{{Link title="Выйти"
                     styles="link link-decor-red"
                     href="/"}}}
          </div>

        {{/Form}}

      {{/AccountLayout}}

    `;
  }
}
