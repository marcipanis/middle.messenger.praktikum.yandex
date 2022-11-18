import Block from '../../utils/block';

import './accountLayout.css';

interface AccountLayoutProps {
    label?: string;
    // onClick: () => void;
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
                    {{{Button  styles="button-account-form button-background-left-arrow" onClick=onClick }}}
                </div>
                <div class="account-form-container">
                   <div data-slot=1></div>
                </div>
            </div>
      `;
  }
}
