import Block from '../../utils/block';

import './link.css';

interface LinkProps {
    linkWrap?: string;
    styles?: string;
    href: string;
    background?: string;
    title?: string;
    linkBroder?: string;
}

export class Link extends Block {
    static componentName = 'Link';
  constructor({
    linkWrap, styles, href, background, title, linkBroder,
  }: LinkProps) {
    const onClick = (e: MouseEvent) => {
      console.log('link click', e.offsetX);
      e.preventDefault();
      window.location.replace(href);
    };

    super({
      linkWrap, styles, href, background, title, linkBroder, events: { click: onClick },
    });
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="{{linkWrap}}">
                <a class="{{styles}}" href="{{href}}">
                    <div class="{{background}}"></div>
                    {{title}}
                </a>
                <div class="{{linkBorder}}"></div>
            </div>
        `;
  }
}
