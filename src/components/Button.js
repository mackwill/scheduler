import React from "react";
import classnames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  const btnClass = classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      disabled={props.disabled}
      className={btnClass}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
