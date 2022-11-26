import * as handlebars from 'handlebars';
import { beforeEach } from 'mocha';
import { expect } from 'chai';

describe('Handlebars', () => {

  // @ts-ignore
  let content: handlebars;

  beforeEach(() => {
    content = handlebars;
  });

  it('Should compile', () => {
    const html = content.compile('<div></div>');
    expect(html()).to.eq('<div></div>');
  });
});
