import Block from '../../utils/block';
import { InputProps } from '../input';

import Validator, { ValidationType } from '../../utils/validation';

import './accountInput.css';

interface AccountInputProps extends InputProps {
    title: string;
    validationType: ValidationType;
    validateMessage: string;
    isValid: boolean;
}

export class AccountInput extends Block {
  static componentName = 'AccountInput';

  constructor({
    ...props
  }: AccountInputProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent) => {
        const input = e.target as HTMLInputElement;
        const { value } = input;
        const { name } = input;
        const [flag, text] = Validator.validate(<ValidationType>name, value);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        <div class="account-input-wrap">
            <div class="account-input-label-wrap">
                <span class="account-input-label">{{title}}</span>
                {{{Input id=id
                        value=value
                        title=title
                        styles=styles
                        type=type
                        name=name
                        placeholder=placeholder
                        onFocus=onFocus
                        onBlur=onBlur
                        onChange=onChange
               }}}
            </div>
            <div class="account-input-border"></div>
            {{{ErrorInput validateMessage="Невалидное значение" isValid=true ref="error"}}}
        </div>

    `;
  }
}
