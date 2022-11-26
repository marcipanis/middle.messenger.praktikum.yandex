/*eslint-disable */
const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');
const Module = require('module');
/* eslint-enable */

const { window } = new JSDOM('<div class="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

const originalRequire = Module.prototype.require;
Module.prototype.require = function fn() {
  // eslint-disable-next-line prefer-rest-params
  if (arguments[0] && arguments[0].endsWith('.css')) return;
  // eslint-disable-next-line prefer-rest-params,consistent-return
  return originalRequire.apply(this, arguments);
};
