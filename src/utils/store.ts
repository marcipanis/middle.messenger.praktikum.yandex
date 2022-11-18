// eslint-disable-next-line max-classes-per-file
import { isEqual, set } from './functions';
import { UserData } from '../api/loginApi';
import EventBus from './eventBus';
import Block from './block';
import { ChatData, ChatMessages, SelectedData } from '../api/chatsApi';

export enum StoreEvents {
  Updated = 'updated',
}

export interface StoreData {
  currentUser?: UserData;
  chats?: ChatData;
  messages?: ChatMessages;
  selected?: SelectedData;
}

export class Store extends EventBus {
  private state: StoreData = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown, rewrite = false) {
    set(this.state, path, value, rewrite);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public closeAll() {
    set(this, 'state', '');
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: StoreData) => Record<string, unknown>) => (Component: typeof Block) => {
  let state: any;

  return class extends Component {
    constructor(props: any) {
      state = mapStateToProps(store.getState());

      super({ ...props, ...state });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({
            ...newState,
          });
        }
      });
    }
  };
};

export default store;
