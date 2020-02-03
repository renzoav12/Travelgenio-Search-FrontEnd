import React, { useState } from "react";
import {
  Container,
  useTheme,
  useMediaQuery,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CommentIcon from "@material-ui/icons/Comment";
import LinksContainer from "./LinksContainer";
import SubscriptionContainer from "./SubscriptionContainer";
import { IEmailSubscriptionRequest } from "../../interfaces";

export interface IFooterLayoutProps {
  i18n: Map<string, string>;
  initial: any;
  subscribeEmail: (emaulSubscriptionRequest: IEmailSubscriptionRequest) => void;
}

const FooterLayout: React.SFC<IFooterLayoutProps> = props => {
  const { i18n, initial, ...rest } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [openBoletin, setOpenBoletin] = useState(false);
  const handleClickBoletin = () => {
    setOpenBoletin(!openBoletin);
    setOpenBlog(false);
  };
  const [openBlog, setOpenBlog] = useState(false);
  const handleClickBlog = () => {
    setOpenBlog(!openBlog);
    setOpenBoletin(false);
  };
  if (isDesktop) {
    return (
      <Container maxWidth="lg" className="footer-links-subscribers">
        <Grid container>
          <LinksContainer i18n={i18n} initial={initial} />
          <SubscriptionContainer i18n={i18n} initial={initial} subscribeEmail={props.subscribeEmail} />
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="lg" className="footer-links-subscribers">
        <List>
          <ListItem button onClick={handleClickBoletin}>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.get("footer.offers.release")} />
            {openBoletin ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBoletin} timeout="auto" unmountOnExit>
            <SubscriptionContainer i18n={i18n} initial={initial} subscribeEmail={props.subscribeEmail}/>
          </Collapse>
        </List>
        <List>
          <ListItem button onClick={handleClickBlog}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.get("navbar.blog")} />
            {openBlog ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBlog} timeout="auto" unmountOnExit>
            <LinksContainer i18n={i18n} initial={initial} />
          </Collapse>
        </List>
      </Container>
    );
  }
};

export default FooterLayout;
