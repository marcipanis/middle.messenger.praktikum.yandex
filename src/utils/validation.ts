import block from "./block";

export enum ValidationType {
  first_name = "first_name",
  second_name = "second_name",
  display_name = "display_name",
  login = "login",
  email = "email",
  old_password = "old_password",
  password = "password",
  repeat_password = "repeat_password",
  phone = "phone",
}

class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Что то пошло не так: ${JSON.stringify(val)}`);
  }
}

class Validator {
  dname(value: string): [boolean, string] {
    return [
      /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/.test(value),
      "Допустимы символы латиницы и кириллицы, а также дефис",
    ];
  }

  login(value: string): [boolean, string] {
    return [
      /(?!^\d+$)[A-Za-z0-9_-]{3,20}/.test(value),
      "Только английские буквы и цифры без пробелов, также допустимы символы _ и -",
    ];
  }

  email(value: string): [boolean, string] {
    const regexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+[a-zA-Z0-9]+$/.test(
        value
      );
    return [regexp, "Попробуйте еще раз"];
  }

  password(value: string): [boolean, string] {
    return [
      /[A-Za-z0-9]{8,40}/.test(value) &&
        /[A-Z]/.test(value) &&
        /[0-9]/.test(value),
      "От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
    ];
  }

  phone(value: string): [boolean, string] {
    return [/\+?[0-9]{10,15}/.test(value), "Попробуйте еще раз"];
  }

  validate(type: ValidationType, value: string): [boolean, string] {
    switch (!value.length) {
      case true:
        return [false, "Значение не должно быть пустым"];
      case false:
        switch (type) {
          case ValidationType.login:
            return this.login(value);
          case ValidationType.first_name:
          case ValidationType.second_name:
          case ValidationType.display_name:
            return this.dname(value);
          case ValidationType.email:
            return this.email(value);
          case ValidationType.password:
          case ValidationType.old_password:
          case ValidationType.repeat_password:
            return this.password(value);
          case ValidationType.phone:
            return this.phone(value);
          default:
            throw new UnreachableCaseError(type);
        }
    }
  }
}

export default new Validator();


export function Validation(
  inputs: NodeListOf<HTMLInputElement>,
  refs: {
    [x: string]: block<any>;
    login?: any;
    password?: any;
    email?: any;
    first_name?: any;
    second_name?: any;
    phone?: any;
    repeat_password?: any;
  }
): Record<string, unknown> {
  const loginData: Record<string, unknown> = {};
  const validator = new Validator();

  inputs.forEach((input) => {
    loginData[input.name] = input.value;
    const [valid, text] = validator.validate(
      <ValidationType>input.name,
      input.value
    );

    if (input.name === "login") {
      refs.login.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

    if (input.name === "password") {
      refs.password.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

    if (input.name === "email") {
      refs.email.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

    if (input.name === "first_name") {
      refs.first_name.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

    if (input.name === "second_name") {
      refs.second_name.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

    if (input.name === "display_name") {
      refs.display_name.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

    if (input.name === "phone") {
      refs.phone.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

    if (input.name === "repeat_password") {
      refs.repeat_password.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

    if (input.name === "old_password") {
      refs.old_password.refs.error.setProps({
        isValid: valid,
        validateMessage: text,
      });
    }

  });
  return loginData;
}
