import Block from '../../utils/block';

type LinkPageProps = {
    variable: string;
    links: Array<{title: string; styles: string; href: string}>
}

export class LinkPage extends Block {
  constructor({ variable, links }: LinkPageProps) {
    super({ variable, links });
  }

  render() {
    // language=hbs
    return `
      <div class="container">
        <div class="container-align-center">
          <div>{{ variable }}</div>
          {{{ button label="Hey asd"
                     styles="button-form"
                     background="button-background-default"}}}
          <h1>Список страниц</h1>
        </div>
        <div class="ul-wrap">
          <ul>
            {{#each links}}
              {{#with this}}
              <li> {{{Link title="{{title}}"
                           styles="{{styles}}"
                           href="{{href}}" }}} </li>
              {{/with}}
            {{/each}}
          </ul>
        </div>
      </div>
    
    `;
  }
}
