import Block from '../../utils/block';
import './avatar.css';

interface AvatarProps {
  id: string,
  edit?: boolean,
  styles: string,
  onClick?: () => void;
  events: Record<string, unknown>;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  constructor({ onClick, ...props }: AvatarProps) {
    super({
      ...props, events: { click: onClick },
    });
  }

  render() {
    // language=hbs
    return `
      <div class="avatar-container">
        <div class="avatar-wrap">
          <div class="{{styles}}" id="{{id}}" 
            {{#if avatar}} 
               style="background-image: url('https://ya-praktikum.tech/api/v2/resources{{avatar}}'); 
                   background-size: cover;" 
            {{/if}}>
            {{#if edit}}
              <label   class="input-avatar-label" >Поменять аватар</label>
            {{/if}}
          
          </div>
        </div>
      </div>
      
     `;
  }
}
