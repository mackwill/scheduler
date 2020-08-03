import React from "react";

function Header(props) {
  return (
    <header className="appintment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}

export default Header;
