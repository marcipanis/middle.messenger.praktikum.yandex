import Block from '../../utils/block';
import './errorInput.css';

interface ErrorInputProps {
  isValid: boolean,
  validateMessage: string,
}

export class ErrorInput extends Block<ErrorInputProps> {
  static componentName = 'ErrorInput';

  constructor({ ...props }: ErrorInputProps) {
    super({ ...props });
  }

  protected render(): string {
    if (this.props.isValid) {
      return '<div />';
    }

    // language=hbs
    return `
        <span class="input-validate-message">{{validateMessage}}</span>`;
  }
}
