import template from "./registration.hbs";
import * as regcss from "./registration.scss";

export function registration(props) {
  return template({ regcss, ...props });
}

