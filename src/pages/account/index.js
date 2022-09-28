import template from "./account.hbs";
import * as accountcss from "./account.scss";

export function account(props) {
  return template({ accountcss, ...props });
}
