import Block from '../../utils/block';

import './chat.css';

type ChatPageProps = {
  accountName: string;
  chatlistItems: { displayName: string; messageTime: string; avatar: string; message: string; messageCount: number}[];
  isChat: boolean;
}

export class Chat extends Block {
  constructor({ ...props }: ChatPageProps) {
    super({ ...props });
  }

  protected getStateFromProps() {
    this.state = {
      ItemClick: (e: FocusEvent) => {
        console.log('itemClick', e.target);
        // Todo itemclick
      },
      onMessage: () => {
        const chatData: Record<string, unknown> = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        chatData.message = document.querySelector('[name="message"]').value;
        console.log('chat/message', chatData);
      },
    };
  }

  render() {
    // language=hbs
    return `
      <div class="chat-container">
        <div class="chatlist-container">
          <div class="chatlist-content-wrap-container">
            {{{Avatar styles="avatar-chat-default"}}}
            <span class="chat-avatar-account-title"> {{accountName}} </span>
            
           {{{Button styles="button-chat-form button-background-exit-right"}}}
          </div>
          <div class="line-decor-wrap"><div class="line-decor-marine"></div></div>
          <div class="chatlist-content-wrap-container">
            {{{Button styles="button-chat-form button-background-add"}}}
            <div class="search-wrap">
              {{{Input
                  ref="search"
                  styles="input input-icon-left input-search"
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Поиск"
                  onFocus=onFocus
                  onBlur=onBlur
                  onChange=onChange
              }}}
            </div>
          </div>
          <div class="chatlist-content-wrap-container chatlist-items-container">

            {{#each chatlistItems}}
              {{#with this}}
                {{{ChatlistItem
                    displayName=displayName
                    messageTime=messageTime
                    avatar=avatar
                    message=message
                    messageCount=messageCount
                    id="chatlistItem"
                    onClick=ItemClick
                }}}
              {{/with}}
            {{/each}}

          </div>
        </div>
        <div class="chatarea-container">
              <div class="chat-wrap">

                {{#if isChat}}
                  
                  <div class="chat-recipient">
                    {{{Avatar styles="avatar-chatlist"}}}
                    <span class="chat-avatar-account-title"> Илья</span>
                    <div class="chat-button-align"> {{{Button styles="button-chat-form button-background-dots"}}}</div>
                  </div>
                  <div class="chat-content">
                    <div class="message-me"> Текст Текст Текст Текст Текст</div>
                    <div class="message-recepient">Текст</div>

                  </div>
                  <div class="chat-form">
                    
                      {{{Button styles="button-chat-form button-background-clip"}}}
                        <div class="search-wrap">
                          {{{Input
                              ref="message"
                              styles="input"
                              type="text"
                              name="message"
                              id="message"
                              placeholder="Сообщение"
                              onFocus=onFocus
                              onBlur=onBlur
                              onChange=onChange
                          }}}
                        </div>
                      {{{Button styles="button-chat-form button-background-right-arrow" onClick=onMessage}}}
                  </div>
                
                {{else}}
                  
                  <div class="chat-text-wrap">
                    <span class="chat-text">Выберите чат, чтобы отправить сообщение</span>
                  </div>
                  
                {{/if}}
                
              </div>
        </div>
      </div>
    `;
  }
}
