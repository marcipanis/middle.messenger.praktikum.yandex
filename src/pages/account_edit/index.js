import template from "./account_edit.hbs";
import * as accounteditcss from "./account_edit.scss";

export function account_edit(props) {
  return template({ accounteditcss, ...props });
}
