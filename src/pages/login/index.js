import template from "./login.hbs";
import * as logincss from "./login.scss";

export function login(props) {
  return template({ logincss, ...props })
}
