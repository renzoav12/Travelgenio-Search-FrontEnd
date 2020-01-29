import React from "react";
import { IHeaderProps } from "../interfaces";

// Components
import Nav from "./Nav";
import Banner from "./Banner";

const Header: React.SFC<IHeaderProps> = props => {
  const { initialData, countries, currencies } = props;

  return (
    <>
      <Banner {...props} />
      <Nav initialData={initialData} />
    </>
  );
};

export default Header;
