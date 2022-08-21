import template from "./error.hbs";
import * as errorcss from "./error.scss";

export function error(props) {
  return template({ errorcss, ...props });
}
