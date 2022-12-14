import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './eventBus';

type Nullable<T> = T | null;
type Keys<T extends Record<string, unknown>> = keyof T;
type Values<T extends Record<string, unknown>> = T[Keys<T>];

type Events = Values<typeof Block.EVENTS>;

export interface BlockClass<P> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
}

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  static componentName: string;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;

  props: P;

  protected children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};

  protected refs: { [key: string]: Record<string, Block> } = {};

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this.getStateFromProps(props);

    this.props = props || ({} as P); // this._makePropsProxy(props || ({} as P));
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  /*eslint-disable */
  // @ts-expect-error
  protected getStateFromProps(props: any): void {
    this.state = {};
  }
  /* eslint-enable */

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  /*eslint-disable */
  // @ts-expect-error
  componentDidMount(props: P) {}
  /* eslint-enable */

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  /*eslint-disable */
  // @ts-expect-error
  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }
  /* eslint-enable */

  setProps = (nextPartialProps: Partial<P>) => { // setProps = (nextProps: P) => {
    if (!nextPartialProps) { // if (!nextProps) {
      return;
    }

    const prevProps = this.props; // Object.assign(this.props, nextProps); };
    const nextProps = { ...prevProps, ...nextPartialProps };

    this.props = nextProps;

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    // ??????, ?????????? ?????????????? CDM ???????????? ?????????? ???????????????????? ?? DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _makePropsProxy(props: P): any {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        // console.log('set new prop', self.id, self.constructor.componentName, target[prop], value) //!!!
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('?????? ??????????????');
      },
    }) as unknown as P;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this.props as any;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const { events } = this.props as any;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._element!.addEventListener(event, listener);
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();
      stub.replaceWith(content);

      const slotContent = content.querySelector('[data-slot="1"]') as HTMLDivElement;

      if (slotContent && stubChilds.length) {
        slotContent.append(...stubChilds);
        delete slotContent.dataset.slot;
      }
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
