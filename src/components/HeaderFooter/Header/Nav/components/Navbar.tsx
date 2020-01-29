import React from "react";
import { INavLink, INavbarProps } from "../../../interfaces";
import { Container } from "@material-ui/core";

const Navbar: React.SFC<INavbarProps> = ({ links }) => {
  return (
    <div className="nav-bar">
      <Container maxWidth="lg" id="container-menu">
        {links.map((link: INavLink) => (
          <a href={link.url} key={link.id}>
            {link.resourceText}
          </a>
        ))}
      </Container>
    </div>
  );
};

export default Navbar;
