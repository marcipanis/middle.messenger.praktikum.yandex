import Block from '../../utils/block';

import './input.css';

export interface InputProps {
    onChange?: () => void;
    onFocus?: () => void;
    onBlur?: (e: FocusEvent) => void;
    id?: string,
    value?: string;
    styles?: string;
    type?: 'text' | 'password' | 'email' | 'phone';
    name: string;
    placeholder?: string;
}

export class Input extends Block {
  static componentName = 'Input';

  constructor({
    onChange, onFocus, onBlur, ...props
  }: InputProps) {
    super({
      ...props, events: { input: onChange, focus: onFocus, blur: onBlur },
    });
  }

  protected render(): string {
    // language=hbs
    return `
          <input  id="{{id}}"
                  value="{{value}}"
                  type="{{type}}"
                  name="{{name}}"
                  class="{{styles}}"
                  placeholder="{{placeholder}}">
    `;
  }
}
