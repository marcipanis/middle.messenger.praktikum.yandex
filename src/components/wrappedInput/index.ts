import Block from '../../utils/block';
import { InputProps } from '../input';

import Validator, { ValidationType } from '../../utils/validation';

import './wrappedInput.css';

interface WrappedInputProps extends InputProps {
    title: string;
    validationType: ValidationType;
    validateMessage: string;
    isValid: boolean;
    onCheck?: (e: FocusEvent) => void;
}

export class WrappedInput extends Block<WrappedInputProps> {
  static componentName = 'WrappedInput';

  constructor({
    ...props
  }: WrappedInputProps) {
    super({
      ...props,
      onCheck: (e: FocusEvent) => {
        const input = e.target as HTMLInputElement;
        const { value } = input;
        const { name } = input;
        const [valid, text] = Validator.validate(<ValidationType>name, value);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.refs.error.setProps({
          isValid: valid,
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
                id=id
                value=value
                title=title
                styles=styles
                type=type
                name=name
                placeholder=placeholder
                onFocus=onCheck
                onBlur=onCheck
                onChange=onChange
                
        }}}
        <div class="input-border"></div>
        {{{ErrorInput validateMessage="Невалидное значение" isValid=true ref="error"}}}
        </div>
    `;
  }
}
