export type Indexed<T = any> = {
  [key in string]: T;
};

export type TStringObject = {[key:string]:string};

export function merge(lhs: Indexed, rhs: Indexed, rewrite = false): Indexed {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    try {
      if (rhs[p].constructor === Object && !rewrite) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }
  return lhs;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
  rewrite = false,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }
  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as Indexed, result, rewrite);
}

export function isPlainObject(value: unknown): value is Indexed {
  return (
    typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function getDatetime(date: Date, full = false) {
  const now = new Date();
  const year = date.getFullYear() === now.getFullYear();
  const month = date.getMonth() === now.getMonth();
  const day = date.getDate() === now.getDate();
  const monthArray = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];
  if (year && month && day) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
  if (year && full) {
    return `${date.getDate()} ${
      monthArray[date.getMonth()]
    } ${date.getHours()}:${date.getMinutes()}`;
  }
  if (year) {
    return `${date.getDate()} ${monthArray[date.getMonth()]}`;
  }
  return `${date.getFullYear()}`;
}

export function onModal(elId:string) {
  const modal = document.getElementById(elId) as HTMLElement;
  const span = document.getElementsByClassName(elId)[0] as HTMLElement;

  modal.style.display = 'block';

  span.onclick = function fn() {
    modal.style.display = 'none';
  };

  window.onclick = function fn(event) {
    if (event.target === modal) {
      modal!.style.display = 'none';
    }
  };
}

export function onAvatarChange(id: string): FormData {
  const avatar = document.createElement('input');
  avatar.type = 'file';
  const avatarData = new FormData();
  avatar.click();

  avatar.onchange = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const file = avatar.files[0];
    avatarData.append('avatar', file);

    const frame = URL.createObjectURL(file);
    document.getElementById(id)!.style.backgroundImage = `url(${frame})`;
    document.getElementById(id)!.style.backgroundSize = 'cover';

    this.avatarData = avatarData;
  };
  return avatarData;
}

export const formatFormData = (data: FormData) => {
  const result: TStringObject = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [name, value] of data) {
    if (typeof value === 'string') {
      result[name] = stringSanitize(trim(value)) as unknown as string;
    }
  }
  return result;
};

export const trim = (string: string, cuted = ''): string => {
  if (!cuted) {
    return string.trim();
  }
  return string.replace(new RegExp(`^[${cuted}]+|[${cuted}]+$`, 'g'), '');
};

export const stringSanitize = (str: string) => str.replace(/[&<>"']/gi, '');
