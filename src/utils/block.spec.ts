import { expect } from 'chai';
import { beforeEach } from 'mocha';
import Block from './block';

interface TestProps {
    test?: string;
}

class ExampleComponent extends Block<TestProps> {
  constructor({ ...props }:TestProps) {
    super({ ...props });
  }

  render() {
    // language=hbs
    return `
      <div>
           <div>{{test}}</div>
      </div>
    `;
  }
}

describe('Block', () => {
  let content: ExampleComponent;

  beforeEach(() => {
    content = new ExampleComponent({});
  });

  it('Should set props', () => {
    content.setProps({ test: 'true' });
    expect(content.props.test).to.eq('true');
  });
});
