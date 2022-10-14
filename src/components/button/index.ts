import Block from '../../utils/block';

import './button.css';

interface ButtonProps {
    label: string;
    background: string;
    styles: string;
    type: string;
    onClick: () => void;
    onSubmit: () => void;
}

export class Button extends Block {
  static componentName = 'Button';
  constructor({
    label, background, styles, type, onClick, onSubmit,
  }: ButtonProps) {
    super({
      label, background, styles, type, events: { click: onClick, submit: onSubmit },
    });
  }

  render(): string {
    // language=hbs
    return `
      <div class="button-container">
          <div class="button-wrap">
          <div class="{{background}}"></div>
              <button  class="{{styles}}" type="{{type}}">
              {{label}}
          </button>
          </div>
      </div>
      `;
  }
}
