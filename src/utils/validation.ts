export enum ValidationType {
    first_name = 'first_name',
    second_name = 'second_name',
    display_name = 'display_name',
    login = 'login',
    email = 'email',
    old_password = 'old_password',
    password = 'password',
    repeat_password = 'repeat_password',
    phone = 'phone'
}

class Validator {
  name(value: string): [boolean, string] {
    return [/^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/.test(value), 'Допустимы символы латиницы и кириллицы, а также дефис'];
  }

  sname(value: string): [boolean, string] {
    return [/^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/.test(value), 'Допустимы символы латиницы и кириллицы, а также дефис'];
  }

  dname(value: string): [boolean, string] {
    return [/^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/.test(value), 'Допустимы символы латиницы и кириллицы, а также дефис'];
  }

  login(value: string): [boolean, string] {
    return [
      /(?!^\d+$)[A-Za-z0-9_-]{3,20}/.test(value),
      'Только английские буквы и цифры без пробелов, также допустимы символы _ и -',
    ];
  }

  email(value: string): [boolean, string] {
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+[a-zA-Z0-9]+$/.test(value);
    return [regexp, 'Попробуйте еще раз'];
  }

  password(value: string): [boolean, string] {
    return [/[A-Za-z0-9]{8,40}/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value),
      'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'];
  }

  opassword(value: string): [boolean, string] {
    return [/[A-Za-z0-9]{8,40}/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value),
      'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'];
  }

  rpassword(value: string): [boolean, string] {
    return [/[A-Za-z0-9]{8,40}/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value),
      'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'];
  }

  phone(value: string): [boolean, string] {
    return [/\+?[0-9]{10,15}/.test(value), 'Попробуйте еще раз'];
  }

  validate(type: ValidationType, value: string): [boolean, string] {
    if (!value.length) {
      return [false, 'Значение не должно быть пустым'];
    } if (type === ValidationType.login) {
      return this.login(value);
    } if (type === ValidationType.first_name) {
      return this.name(value);
    } if (type === ValidationType.second_name) {
      return this.sname(value);
    } if (type === ValidationType.display_name) {
      return this.dname(value);
    } if (type === ValidationType.email) {
      return this.email(value);
    } if (type === ValidationType.old_password) {
      return this.opassword(value);
    } if (type === ValidationType.password) {
      return this.password(value);
    } if (type === ValidationType.repeat_password) {
      return this.rpassword(value);
    } if (type === ValidationType.phone) {
      return this.phone(value);
    }
    return [false, 'Что то пошло не так'];
  }
}

export default new Validator();
