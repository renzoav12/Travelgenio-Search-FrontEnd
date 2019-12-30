import React, { FunctionComponent } from 'react';
import CardList from '../../CardList/CardList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Pagination } from '../../../model/search';
import { Grid, Typography, Box } from '@material-ui/core';
import { CardProps } from '../../Card/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface ResultProps {
    loading: boolean;
    pagination: Pagination;
    accommodations: CardProps[];
    loadNextPage: () => void;
    selected: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchProgressBox: {
      paddingTop: 10,
      paddingBottom: 10,
      textAlign: "center"
    },
    nextPageProgressBox: {
      paddingTop: 20,
      paddingBottom: 40,
      textAlign: "center"
    },
    counter: {
      marginTop: 10
    }
  }),
);

const Result: FunctionComponent<ResultProps> = props => {

    const classes = useStyles();

    const loadNextPage = () => {
        props.loadNextPage();
    }

    const renderCardList = () => {
        return <CardList 
                accommodations={props.accommodations}
                selected={props.selected}/>
    }

    const renderLoaderWhenLoading = () => {
        if (props.loading) 
            return renderLoader();
    }

    const renderLoader = () => {
        return <Box className={classes.nextPageProgressBox}><CircularProgress/></Box>;
    }

    const renderCardListWithInfiniteScroll = () => {
        return <InfiniteScroll
                    dataLength={props.accommodations.length} 
                    pageStart={1}
                    hasMore={true}
                    initialLoad={false}
                    next={loadNextPage}
                    loader={renderLoaderWhenLoading()}>
                    {renderCardList()}
                </InfiniteScroll>
    }

    const progressBar = <Box className={classes.searchProgressBox}><LinearProgress/></Box>;

    const counter = () => {
      return props.loading
          ? <Typography variant="h1">Buscando alojamientos...</Typography>
          : <Typography variant="h1">Se encontraron {props.pagination.filteredElements} {props.pagination.filteredElements == props.pagination.elements ? "" : " de " + props.pagination.elements} alojamientos</Typography>;
    }

    const hasCards = props.accommodations.length > 0;
        
    return <Grid container>
        <Grid item xs={12} className={classes.counter}>
          {counter()}
        </Grid>
        <Grid item xs={12}>
            {props.loading && progressBar}
            {hasCards && renderCardListWithInfiniteScroll()}
        </Grid>
    </Grid>
  }


export default Result