import Block from '../../utils/block';
import './modal.css';

type ModalProps = {
    id: string;
}

export class Modal extends Block<ModalProps> {
  static componentName = 'Modal';

  constructor({ ...props }: ModalProps) {
    super({ ...props });
  }

  render() {
    // language=hbs
    return `
            <div>
                <div id="{{id}}" class="modal">
                  <div class="modal-content">
                      <div data-slot=1></div>
                      <div class="padding"> <span class="close {{id}}">&times;</span> </div>
                  </div>
                </div>
            </div>
    `;
  }
}
