import Block from '../../utils/block';
import { InputProps } from '../input';

import Validator, { ValidationType } from '../../utils/validation';

import './wrappedInput.css';

interface WrappedInputProps extends InputProps {
    title: string;
    validationType: ValidationType;
    validateMessage: string;
    isValid: boolean;
}

export class WrappedInput extends Block {
  constructor({
    ...props
  }: WrappedInputProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent) => {
        const input = e.target as HTMLInputElement;
        const { value } = input;
        const { name } = input;
        const [flag, text] = Validator.validate(<ValidationType>name, value);
        this.refs.error.setProps({
          isValid: flag,
          validateMessage: text,
        });
      },

    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="input-wrap">
        <span class="input-label">{{title}}</span>
        {{{Input
                title=title
                styles=styles
                type=type
                name=name
                placeholder=placeholder
                onFocus=onFocus
                onBlur=onBlur
                onChange=onChange
                
        }}}
        <div class="input-border"></div>
        {{{ErrorInput validateMessage="Невалидное значение" isValid=true ref="error"}}}
        </div>
    `;
  }
}
