import Block from '../../utils/block';
import './chatMessage.css';

interface MessageProps {
    content: string;
    isMine: boolean;
    time?: string;
    read?: boolean;
    delivered?: boolean;
}

export class Message extends Block<MessageProps> {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="message {{#if isMine}} message-me {{else}} message-recepient {{/if}}">  
                <p>{{ content }}</p>
                <span class="message-timestamp">
                    {{ time }}
                  {{#if isMine}}
                      <span class="message-status-icon">
                          {{#if isMine}}
                              {{#if read}}
                                  <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.6" x2="4.85679" y2="-0.6"
                                  transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.71973)" stroke="#1eb759"
                                  stroke-width="1.2"/>
                            <line y1="-0.6" x2="7.28519" y2="-0.6"
                                  transform="matrix(0.705933 -0.708278 0.705933 0.708278 4.12909 6.16003)" stroke="#1eb759"
                                  stroke-width="1.2"/>
                            <line y1="-0.6" x2="7.28519" y2="-0.6"
                                  transform="matrix(0.705933 -0.708278 0.705933 0.708278 7.55731 6.16003)" stroke="#1eb759"
                                  stroke-width="1.2"/>
                          </svg>
                              {{ else }}
                                  <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.6" x2="4.85679" y2="-0.6"
                                  transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.71973)" stroke="#999999"
                                  stroke-width="1.2"/>
                            <line y1="-0.6" x2="7.28519" y2="-0.6"
                                  transform="matrix(0.705933 -0.708278 0.705933 0.708278 4.12909 6.16003)" stroke="#999999"
                                  stroke-width="1.2"/>
                            <line y1="-0.6" x2="7.28519" y2="-0.6"
                                  transform="matrix(0.705933 -0.708278 0.705933 0.708278 7.55731 6.16003)" stroke="#999999"
                                  stroke-width="1.2"/>
                          </svg>
                              {{/if}}
                          {{/if}}
                      </span>
                  {{/if}}
                    
                </span>
            </div>
                
      `;
  }
}
