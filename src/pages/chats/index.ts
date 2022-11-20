import Block from '../../utils/block';

import './chats.css';
import store, { withUser } from '../../utils/store';

import AuthController from '../../controllers/loginController';
import ChatsController from '../../controllers/chatsController';
import { onModal } from '../../utils/functions';

interface ChatsBaseProps {
  onLogout: () => void;
  onAddChatModal: () => void;
  onAddChat: () => void;
  onItemClick: (e: Event) => void;
  onChangeInputSearch: () => void;
}

export class ChatsBase extends Block<ChatsBaseProps> {
  constructor(props: ChatsBaseProps) {
    super({
      ...props,
      onLogout: () => AuthController.logout(),

      onAddChatModal: () => onModal('ModalNewChat'),

      onAddChat: async () => {
        const chatName = (document.getElementsByName('chatName')[0] as HTMLInputElement).value;
        if (chatName) {
          await ChatsController.create(chatName);
        }
      },

      onItemClick: async (e: Event) => {
        const el = (e.target as HTMLElement).closest('.chatlist-item') as HTMLElement;

        if (el.hasAttribute('data-itemId')) {
          e.preventDefault();
          const itemId = Number(el.getAttribute('data-itemId'));

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (store.getState().chats?.chatList[itemId]) {
            await ChatsController.select(itemId);
          }
        }
      },

      onChangeInputSearch: async () => {
        const searchValue = (document.getElementsByName('search')[0] as HTMLInputElement).value;
        await ChatsController.search(searchValue);
      },

    });
  }

  render() {
    // language=hbs
    return `
      <div class="chat-container">
        <div class="chatlist-container">
          <div class="chatlist-content-wrap-container">
            {{{Avatar styles="avatar-chatlist-default" avatar=avatar}}}

            {{{Link title=login
                    tooltip="Настройки профиля"
                    styles="link-decor-marine chat-avatar-account-title"
                    href="/account"
                    }}}

            <div class="chat-button-align"> 
                {{{Button title="Выход" styles="button-chats-form button-background-exit-right" onClick=onLogout}}} 
            </div>
          </div>
          <div class="line-decor-wrap"><div class="line-decor-marine"></div></div>
          <div class="chatlist-content-wrap-container">
            {{{Button title="Добавить новый чат" styles="button-chats-form button-background-add" onClick=onAddChatModal}}}
            <div class="search-wrap">
              {{{Input
                  ref="search"
                  styles="input input-icon-left input-search"
                  type="text"
                  name="search"
                  id="search"
                  value=searchValue 
                  placeholder="Поиск"
                  onFocus=onFocus
                  onBlur=onBlur
                  onChange=onChangeInputSearch
              }}}
            </div>
          </div>
          
          {{#Chatlist onClick=onItemClick}}

            {{#each chatList}}
              {{#with this}}
                {{{ChatlistItem
                    chatlistItemId=id
                    displayName=title
                    messageTime=last_message.time
                    avatar=avatar
                    message=last_message.content
                    user=last_message.user.login
                    messageCount=unread_count
                    id=id
                    selectedChat=selected
                }}}
              {{/with}}
            {{/each}}

            {{/Chatlist }}
              
        </div>
        <div class="chatarea-container">
             
               {{{Chat}}}
                
             
        </div>
          
          {{#Modal id="ModalNewChat"}}
              {{#Form  title="Новый чат" formWrap="form-login-wrap"}}

                  {{{Input
                          styles="input input-icon-left input-login"
                          type="text"
                          name="chatName"
                          id="chatName"
                          placeholder="Название"
                          onFocus=onFocus
                          onBlur=onBlur
                          onChange=onChange
                  }}}
                  <div class="account-input-border"></div>
                  <br>
                  {{{Button
                          label="Вперед"
                          styles="button-form"
                          background="button-background-main"
                          onClick=onAddChat
                  }}}

              {{/Form}}
          {{/Modal}}
        
      </div>

    `;
  }
}

export const Chats = withUser(ChatsBase);
