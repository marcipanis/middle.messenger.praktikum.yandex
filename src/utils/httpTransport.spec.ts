import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import { nanoid } from 'nanoid';
import HTTPTransport from './httpTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let id: string;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/chats');
    id = nanoid(5);
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('.get() should send GET request', () => {
    instance.get(`/${id}/users`);

    const [request] = requests;

    expect(request.method).to.eq('get');
  });

  it('.post() should send POST request', () => {
    instance.post(`/token/${id}`);

    const [request] = requests;

    expect(request.method).to.eq('post');
  });

  it('.put() should send PUT request', () => {
    instance.put('/users', { users: [id], chatId: id });

    const [request] = requests;

    expect(request.method).to.eq('put');
  });

  it('.delete() should send DELETE request', () => {
    instance.delete('/', { chatId: id });

    const [request] = requests;

    expect(request.method).to.eq('delete');
  });
});
