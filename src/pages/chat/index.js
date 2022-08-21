import template from "./chat.hbs";
import * as chatcss from "./chat.scss";

export function chat(props) {
  return template({ chatcss, ...props });
}
