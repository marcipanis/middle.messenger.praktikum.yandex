import Block from '../../utils/block';

import './link.css';

interface LinkProps {
    linkWrap?: string;
    styles?: string;
    href: string;
    background?: string;
    title?: string;
    tooltip?: string;
    linkBroder?: string;
    events: Record<string, unknown>;
}

export class Link extends Block <LinkProps> {
  static componentName = 'Link';

  constructor({
    linkWrap, styles, href, background, title, tooltip, linkBroder,
  }: LinkProps) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      window.location.replace(href);
    };

    super({
      linkWrap, styles, href, background, title, tooltip, linkBroder, events: { click: onClick },
    });
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="{{linkWrap}}">
                <a class="{{styles}}" href="{{href}}" title="{{tooltip}}">
                    <div class="{{background}}"></div>
                    {{title}}
                </a>
                <div class="{{linkBorder}}"></div>
            </div>
        `;
  }
}
