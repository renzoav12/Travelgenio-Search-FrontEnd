import React from 'react';
import Pricing, { PricingProps } from './Pricing/Pricing';
import Content, { ContentProps } from './Content/Content';
import { Grid } from '@material-ui/core';
import './Card.scss';

export interface CardProps {
    id: string,
    content: ContentProps;
    pricing: PricingProps;
    selected: (id: string) => void;
};

const Card = ({id, content, pricing, selected}: CardProps) => (
    <Grid container className="otravo-box-with-border otravo-card">
        <Grid item xs={12} sm={7} md={8} lg={9}>
            <Content id={id} {...content}></Content>
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={3} className="otravo-card-pricing-section">
            <Pricing selected={selected} {...pricing}></Pricing>
        </Grid>
    </Grid>
);

export default Card;
