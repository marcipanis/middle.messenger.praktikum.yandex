import Block from '../../utils/block';

import './chatlist.css';

interface ChatlistProps {
    label?: string;
    onClick: () => void;
    events: Record<string, unknown>;
}

export class Chatlist extends Block<ChatlistProps> {
  static componentName = 'Chatlist';

  constructor({ ...props }: ChatlistProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  render(): string {
    // language=hbs
    return `
            <div>
                <div class="chatlist-content-wrap-container chatlist-items-container"  data-slot=1></div>
            </div>
      `;
  }
}
