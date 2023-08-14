import React from "react";
import "./NavTab.css";

function NavTab() {
  const linkText = "Узнать больше";

  return (
    <nav className="navtab">
      <a href="#project" className="navtab__link-text">
        {linkText}
      </a>
    </nav>
  );
}

export default NavTab;
