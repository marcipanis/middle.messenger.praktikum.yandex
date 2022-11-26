import { expect } from 'chai';
import { beforeEach } from 'mocha';
import Router from './router';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router();
  });

  it('Should change history length', () => {
    router.go('/test-1');
    router.go('/test-2');
    expect(router.history.length).to.eq(3);
  });
});
