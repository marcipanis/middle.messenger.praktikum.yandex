import Block from '../../utils/block';

import './button.css';

interface ButtonProps {
    label: string;
    title?: string;
    background: string;
    styles: string;
    type?: 'button' | 'submit';
    onClick: () => void;
    onSubmit: () => void;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({
    label, title, background, styles, type, onClick, onSubmit,
  }: ButtonProps) {
    super({
      label, title, background, styles, type, events: { click: onClick, submit: onSubmit },
    });
  }

  render(): string {
    // language=hbs
    return `
      <div class="button-container">
          <div class="button-wrap">
          <div class="{{background}}"></div>
              <button  class="{{styles}}" type="{{type}}" title="{{title}}">
              {{label}}
          </button>
          </div>
      </div>
      `;
  }
}
