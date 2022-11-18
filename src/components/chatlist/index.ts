import Block from '../../utils/block';

import './chatlist.css';

interface ChatlistProps {
    label?: string;
    onClick: () => void;
}

export class Chatlist extends Block {
  static componentName = 'Chatlist';

  constructor({ onClick, ...props }: ChatlistProps) {
    super({ ...props, events: { click: onClick } });
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
