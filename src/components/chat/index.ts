import Block from '../../utils/block';
import { MessageData } from '../../api/chatsApi';
import store, { withStore } from '../../utils/store';
import { formatFormData, onAvatarChange, onModal } from '../../utils/functions';
import chatsController from '../../controllers/chatsController';
import accountController from '../../controllers/accountController';

import './chat.css';

interface ChatProps {
    selectedChat: number | undefined;
    selectedChatData: [];
    messages: MessageData[];
    userId: number;
}

interface ChatBaseProps extends ChatProps{
  onDropdown: () => void;
  onModalOpenAddUser: () => void;
  onModalOpenDelUser: () => void;
  onModalOpenAddAvatar: () => void;
  onAvatarClick: () => void;
  onModalOpenDelChat: () => void;
  onDropdownAddAvatar: () => void;
  onDropdownAddUser: () => void;
  onDropdownDelUser: () => void;
  onDropdownDelChat: () => void;
  onMessage: (e: any) => void;
}

export function selectedChat(): number {
  const state = store.getState();
  const currentChat = state.selected!.selectedChat;
  return currentChat!;
}

export class ChatBase extends Block<ChatBaseProps> {
  static componentName = 'Chat';

  private avatarData: unknown;

  constructor({ ...props }: ChatProps) {
    super({
      ...props,
      onDropdown: () => {
        const dropdownChat = document.getElementById('dropdownChat') as HTMLElement;
        dropdownChat.classList.toggle('show');

        window.onclick = function dpdw(event) {
          if (!(event.target as HTMLButtonElement).matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            let i: number;
            for (i = 0; i < dropdowns.length; i++) {
              const openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
        };
      },
      onModalOpenAddUser: () => onModal('ModalAddUser'),
      onModalOpenDelUser: () => onModal('ModalDelUser'),
      onModalOpenAddAvatar: () => onModal('ModalAddAvatar'),
      onAvatarClick: () => {
        this.avatarData = onAvatarChange('chatAvatar');
      },
      onModalOpenDelChat: () => onModal('ModalDelChat'),
      onDropdownAddAvatar: async () => {
        if (this.avatarData instanceof FormData) {
          await chatsController.changeAvatar(<number> this.props.selectedChat, this.avatarData);
        }
      },
      onDropdownAddUser: async () => {
        const currentChat = selectedChat();
        const AddUserName = (document.getElementsByName('addUser')[0] as HTMLInputElement).value;
        const AddUserData = await accountController.search(AddUserName);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const AddUserId = AddUserData[0]?.id;
        if (AddUserId === undefined) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.refs.addUser.refs.error.setProps({
            validateMessage: 'Такого пользователя нет',
          });
        }
        if (AddUserId) {
          await chatsController.addUsers(currentChat, [AddUserId]);
        }
      },
      onDropdownDelUser: async () => {
        const currentChat = selectedChat();
        const delUserId = Number((document.getElementsByName('delUser')[0] as HTMLSelectElement).value);
        if (delUserId) {
          await chatsController.deleteUsers(currentChat, [delUserId]);
        }
      },
      onDropdownDelChat: () => {
        const currentChat = selectedChat();
        chatsController.delete(currentChat!);
      },
      onMessage: async (e) => {
        e.preventDefault();
        const messageData = new FormData(document.getElementById('messageForm') as HTMLFormElement);
        const formData = formatFormData(messageData);
        await chatsController.sendMessage(formData.message);
      },
    });
  }

  render(): string {
    // language=hbs
    return `
            {{#if selectedChat}}
                
                <div class="chat-wrap">
                    <div class="chat-recipient">
                            {{{Avatar  styles="avatar-chatlist-default" avatar=selectedChatData.avatar}}}
                        
                            <span class="chat-avatar-account-title"> {{selectedChatData.title}}</span>
                        
                            <div class="chat-button-align dropdown">
                                {{{Button styles="button-chat-form button-background-dots dropbtn" onClick=onDropdown}}}
                                <div id="dropdownChat" class="dropdown-content">
                                    {{{Button label="Добавить пользователя" styles="dropdown-button" onClick=onModalOpenAddUser}}}
                                    {{{Button label="Удалить пользователя" styles="dropdown-button" onClick=onModalOpenDelUser}}}
                                    {{{Button label="Изменить аватар" styles="dropdown-button" onClick=onModalOpenAddAvatar}}}
                                    {{{Button label="Удалить чат" styles="dropdown-button" onClick=onModalOpenDelChat}}}
                                </div>
                            </div>
                        
                        
                        </div>
                        <div class="chat-content ">
                            <div class="chatlist-messages-container">
                                {{#each messages.list}}
                                    {{#with this}}
                                        {{{Message 
                                                content=content 
                                                time=time 
                                                isMine=isMine 
                                                read=is_read 
                                        }}}
                                    {{/with}} 
                                {{/each}}
                            </div>    
                        </div>
                        <div class="chat-form">
        
                            {{{Button styles="button-chats-form button-background-clip"}}}

                            <form class="message-form" id="messageForm">
                                
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
                                {{{Button type=submit styles="button-chats-form button-background-right-arrow" onClick=onMessage}}}
                            </form>
                            
                           
                        </div>

                    {{#Modal id="ModalDelChat"}}
                        {{#Form  title="Удалить чат" formWrap="form-login-wrap"}}
                            {{{Button
                                    label="Вы уверены?"
                                    styles="button-form"
                                    background="button-background-main"
                                    onClick=onDropdownDelChat
                            }}}

                        {{/Form}}
                    {{/Modal}}

                    {{#Modal id="ModalDelUser"}}
                        {{#Form  title="Удалить пользователя" formWrap="form-login-wrap"}}

                            <select name="delUser" id="delUser" class="select">
                                <option value="" selected="selected">Выберите пользователя</option>
                                {{#each selectedChatData.user_list}}
                                    {{#with this}}
                                        <option value="{{id}}">{{login}}</option>
                                    {{/with}}
                                {{/each}}
                            </select>
                        
                            <br>
                            {{{Button
                                    label="Вперед"
                                    styles="button-form"
                                    background="button-background-main"
                                    onClick=onDropdownDelUser
                            }}}

                        {{/Form}}
                    {{/Modal}}

                    {{#Modal id="ModalAddUser"}}
                        {{#Form  title="Новый пользователь" formWrap="form-login-wrap"}}

                            {{{WrappedInput
                                    styles="input input-icon-left input-login"
                                    ref="addUser"
                                    type="text"
                                    name="addUser"
                                    id="addUser"
                                    placeholder="Название"
                                    onFocus=onFocus
                                    onBlur=onBlur
                                    onChange=onChange
                            }}}
                           
                            {{{Button
                                    label="Вперед"
                                    styles="button-form"
                                    background="button-background-main"
                                    onClick=onDropdownAddUser
                            }}}

                        {{/Form}}
                    {{/Modal}}

                    {{#Modal id="ModalAddAvatar"}}
                        {{#Form  title="Изменить аватар" formWrap="form-login-wrap"}}
                            {{{Avatar id="chatAvatar" styles="avatar-default" avatar=selectedChatData.avatar edit=true onClick=onAvatarClick }}}
                            <br>
                            {{{Button
                                    label="Вперед"
                                    styles="button-form"
                                    background="button-background-main"
                                    onClick=onDropdownAddAvatar
                            }}}

                        {{/Form}}
                    {{/Modal}}
                </div>
                
            {{else}}
                
                <div class="chat-wrap">
                    <div class="chat-text-wrap">
                        <span class="chat-text">Выберите чат, чтобы отправить сообщение</span>
                    </div>
                </div>
                
            {{/if}}
      `;
  }
}

const withSelectedChatMessages = withStore((state: any) => {
  const selectedChatId = state.selected?.selectedChat;
  const selectedChatData = state.chats?.chatList[selectedChatId];

  if (!selectedChatData) {
    return {
      messages: [],
      selectedChat: undefined,
      selectedChatData: undefined,
      userId: state.currentUser?.id,
    };
  }

  return {
    messages: state.messages,
    selectedChat: state.selected?.selectedChat,
    selectedChatData: state.chats?.chatList[state.selected.selectedChat],
    userId: state.currentUser?.id,
  };
});

export const Chat = withSelectedChatMessages(ChatBase);
