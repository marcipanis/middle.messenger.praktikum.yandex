import Block from '../../utils/block';
import './errorInput.css';

export class ErrorInput extends Block {
  static componentName = 'ErrorInput';

  protected render(): string {
    if (this.props.isValid) {
      return '<div />';
    }

    // language=hbs
    return `
        <span class="input-validate-message">{{validateMessage}}</span>`;
  }
}
