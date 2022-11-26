import { expect } from 'chai';
import sinon from 'sinon';
import { Button } from '.';

describe('Button', () => {
  it('should render', () => {
    new Button({ label: 'Test Button' });
  });

  it('element should return div', () => {
    const button = new Button({ label: 'Test Button' });
    const { element } = button;

    expect(element).to.be.instanceof(window.HTMLDivElement);
  });

  it('should create console log  on click', () => {
    const button = new Button({ label: 'Test Button', onClick: () => { console.log('Hello World'); } });
    const spy = sinon.spy(console, 'log');
    const element = button.element as HTMLDivElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
