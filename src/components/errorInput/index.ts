import Block from '../../utils/block';
import './errorInput.css';

export class ErrorInput extends Block {
  protected render(): string {
    if (this.props.isValid) {
      return '<div />';
    }

    // language=hbs
    return `
        <span class="input-validate-message">{{validateMessage}}</span>`;
  }
}
