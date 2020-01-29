import React from "react";
import { INavProps } from "../../interfaces";

// Styles
import "./styles.scss";

// Components
import Navbar from "./components/Navbar";
import MenuDrawer from "./components/MenuDrawer";

const Nav: React.SFC<INavProps> = ({ initialData }): JSX.Element => {

  return (
    <div className="nav">
      <Navbar links={initialData.headerItems.navItemLinks} />
      <MenuDrawer links={initialData.headerItems.navItemLinks} />
    </div>
  );
};

export default Nav;
