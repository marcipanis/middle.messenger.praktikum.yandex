import { queryStringify } from './functions';

export enum Method {
    get = 'get',
    post = 'post',
    put = 'put',
    patch = 'patch',
    delete = 'delete'
}

export enum ContentType {
    json = 'application/json',
    formData = 'multipart/form-data'
}

type Options = {
    method: Method;
    type: ContentType;
    data?: any;
};

type HTTPMethod = (url: string, data?: unknown, type?: ContentType) => Promise<unknown>;

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  // eslint-disable-next-line default-param-last
  public get: HTTPMethod = (path = '/', data?, type = ContentType.json) => (
    this.request(this.endpoint + path, { type, data, method: Method.get })
  );

  public post: HTTPMethod = (path, data?, type = ContentType.json) => (
    this.request(this.endpoint + path, { type, data, method: Method.post })
  );

  public put: HTTPMethod = (path, data, type = ContentType.json) => (
    this.request(this.endpoint + path, { type, data, method: Method.put })
  );

  public patch: HTTPMethod = (path, data, type = ContentType.json) => (
    this.request(this.endpoint + path, { type, data, method: Method.patch })
  );

  public delete: HTTPMethod = (path, data?, type = ContentType.json) => (
    this.request(this.endpoint + path, { type, data, method: Method.delete })
  );

  private request<Response>(url: string, options: Options = { method: Method.get, type: ContentType.json }): Promise<Response> {
    const { method, type, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Method.get;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (type !== ContentType.formData) {
        xhr.setRequestHeader('Content-Type', type);
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.get || !data) {
        xhr.send();
      } else if (type === ContentType.json) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  }
}
