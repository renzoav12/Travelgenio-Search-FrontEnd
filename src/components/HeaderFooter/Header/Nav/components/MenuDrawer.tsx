import React, { useState } from "react";
import { INavLink, IDrawerProps } from "../../../interfaces";

// Material UI Icons and Core
import {
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from "@material-ui/core";
import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  Forum as ForumIcon,
  Flight as FlightIcon,
  Forward as ForwardIcon,
  MoreVert as MoreVertIcon,
  DriveEta as DriveEtaIcon,
  ContactMail as ContactMailIcon
} from "@material-ui/icons";

const showIcon = (id: string): JSX.Element => {
  switch (id) {
    case "home":
      return <HomeIcon />;
    case "flights":
      return <FlightIcon className="flight" />;
    case "hotel":
      return <HotelIcon />;
    case "cars":
      return <DriveEtaIcon />;
    case "blog":
      return <ForumIcon />;
    case "myFlights":
      return <span className="icon-calendar-plane" />;
    case "contact":
      return <ContactMailIcon />;
    default:
      return <ForwardIcon />;
  }
};

const ItemList = (item: INavLink): JSX.Element => (
  <React.Fragment key={item.id}>
    <a href={item.url} target="_blank">
      <ListItem button className="menu-divider">
        <ListItemIcon className="icon">{showIcon(item.id)}</ListItemIcon>
        <ListItemText className="menu-title" primary={item.resourceText} />
      </ListItem>
    </a>
    <Divider />
  </React.Fragment>
);

const MenuDrawer: React.SFC<IDrawerProps> = ({ links }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="drawer-menu">
      <IconButton
        edge="start"
        color="inherit"
        className="more-vert"
        aria-label="open drawer"
        onClick={() => setOpen(true)}
      >
        <MoreVertIcon />
      </IconButton>

      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        className="menu-drawer"
      >
        <List>{links.map(ItemList)}</List>
      </SwipeableDrawer>
    </div>
  );
};

export default MenuDrawer;
