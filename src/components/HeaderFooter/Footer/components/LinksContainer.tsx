import React from "react";
import { Divider, Grid, Link } from "@material-ui/core";

export interface ILinksContainerProps {
  i18n: Map<string, string>;
  initial: any;
}

const LinksContainer: React.SFC<ILinksContainerProps> = (props) => {
  const { i18n, initial, ...rest } = props;
  return (
    <Grid container item xs={12} sm={8}>
      {initial.footerItems.footerLinks.map((footerLink: any, i: number) => {
        return (
          <Grid container key={i} item xs={12} sm={6} className="footer-links-item">
            <Link href={footerLink.url} target="_blank">
              {footerLink.resourceText}
            </Link>
            <Divider />
          </Grid>
        )
      })}
    </Grid>
  );
}

export default LinksContainer;