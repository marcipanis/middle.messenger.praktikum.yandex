import Block from '../../utils/block';

import './avatar.css';

interface AvatarProps {
  styles: string;
}

export class Avatar extends Block {
  static componentName = 'Avatar';
  constructor({
    styles,
  }: AvatarProps) {
    super({
      styles,
    });
  }

  render() {
    // language=hbs
    return `
      <div class="avatar-container">
        <div class="avatar-wrap">
          <div class="{{styles}}">
            <div data-layout=1></div>
          </div>
        </div>
      </div>
      
     `;
  }
}
