import Block from '../../utils/block';
import './error.css';

export class Error extends Block {
  render() {
    // language=hbs
    return `
      <div class="container">
        <div class="container-flex-wrap">
          <div class="error-wrap">
            <span class="error-title"> 404</span>
            <span class="error-text"> Не туда попали </span>
            {{{Link title="Назад к чатам"
                     linkWrap="link-wrap"
                     styles="link error-link"
                     href="/chats" background="error-link-bg"}}}
          </div>
        </div>
      </div>
    `;
  }
}
