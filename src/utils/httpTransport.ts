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

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  // eslint-disable-next-line default-param-last
  public get<Response>(path = '/', data?: unknown, type: ContentType = ContentType.json): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.get,
      type,
      data,
    });
  }

  public post<Response = void>(path: string, data?: unknown, type: ContentType = ContentType.json): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.post,
      type,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown, type: ContentType = ContentType.json): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.put,
      type,
      data,
    });
  }

  public patch<Response = void>(path: string, data: unknown, type: ContentType = ContentType.json): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.patch,
      type,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown, type: ContentType = ContentType.json): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.delete,
      data,
      type,
    });
  }

  private request<Response>(url: string, options: Options = { method: Method.get, type: ContentType.json }): Promise<Response> {
    const { method, type, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

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
