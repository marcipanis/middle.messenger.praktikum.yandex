import Block from '../../utils/block';

import './chatlistItem.css';

interface ChatlistItemProps {
    chatlistItemId: number;
    displayName: string;
    messageTime: Date;
    avatar?: string;
    message: string;
    messageCount?: number;
    selectedChat?: boolean;
}

export class ChatlistItem extends Block {
  static componentName = 'ChatlistItem';

  constructor({ ...props }: ChatlistItemProps) {
    super({ ...props });
  }

  render(): string {
    // language=hbs
    return `
            <div class="chatlist-item  
                {{#if selectedChat}} chatlist-selected {{/if}}" 
                {{#if chatlistItemId}} data-itemId="{{chatlistItemId}}" {{/if}} >
                <div class="chatlist-item-avatar">
                    {{{Avatar styles="avatar-chatlist-default" avatar=avatar}}}
                </div>

                <div class="chatlist-item-message">
                    <div class="chatlist-item-message-title">
                        <div class="chatlist-item-message-title-left">  {{displayName}} </div>
                        <div class="chatlist-item-message-title-right"> {{messageTime}} </div>
                    </div>
                    <div class="chatlist-item-message-text">
                        <div class="chatlist-item-message-text-left"> {{user}}{{#if user}}:{{/if}} {{message}} </div>
                        <div class="chatlist-item-message-text-right">
                         {{#if messageCount}}
                            <div class="number-circle"> {{messageCount}} </div>
                         {{/if}}
                        </div>
                    </div>

                </div>
            </div>
      `;
  }
}
