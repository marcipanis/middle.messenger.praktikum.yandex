import Block from '../../utils/block';

import './form.css';

interface FormProps {
  formWrap: string;
  title: string;
}

export class Form extends Block {
  static componentName = 'Form';

  constructor(props: FormProps) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `
      <div class="container">
        <div class="container-flex-wrap">
              <div class="{{formWrap}}">
                <form class="form">
                  <span class="form-title"> {{title}}</span>
                  <div data-layout=1></div>
                </form>
              </div>
        </div>
      </div>
     `;
  }
}
