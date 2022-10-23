import Block from '../../utils/block';

import './accountLayout.css';

interface AccountLayoutProps {
    label?: string;
}

export class AccountLayout extends Block {
  static componentName = 'AccountLayout';

  constructor({ ...props }: AccountLayoutProps) {
    super({ ...props });
  }

  render(): string {
    // language=hbs
    return `
            <div class="account-container">
                <div class="account-button-container">
                    {{{Button  styles="button-account-form button-background-left-arrow" }}}
                </div>
                <div class="account-form-container">
                    <div data-layout=1></div>
                </div>
            </div>
      `;
  }
}
