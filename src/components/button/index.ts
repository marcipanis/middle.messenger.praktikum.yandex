import Block from '../../utils/block';

import './button.css';

interface ButtonProps {
    label: string;
    title?: string;
    background?: string;
    styles?: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
    onSubmit?: () => void;
    events?: Record<string, unknown>;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor({ ...props }: ButtonProps) {
    super({ ...props, events: { click: props.onClick, submit: props.onSubmit } });
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
