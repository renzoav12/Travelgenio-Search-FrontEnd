import React, { FunctionComponent } from "react";
import CardList from "../../CardList/CardList";
import InfiniteScroll from "react-infinite-scroll-component";
import { Pagination } from "../../../model/search";
import { Grid, Typography, Box } from "@material-ui/core";
import { CardProps } from "../../Card/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Skeleton from "react-loading-skeleton";
import Keys from "@hotels/translation-keys";
import Translate from "@hotels/translation";

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
      textAlign: "center",
    },
    nextPageProgressBox: {
      paddingTop: 20,
      paddingBottom: 40,
      textAlign: "center",
    },
    counter: {
      marginTop: 20,
    },
    skeleton: {
      marginRight: 25,
      "& span span": {
        marginTop: 20,
      },
    },
  })
);

const Result: FunctionComponent<ResultProps> = (props) => {
  const classes = useStyles();

  const loadNextPage = () => {
    props.loadNextPage();
  };

  const renderCardList = () => {
    return (
      <CardList
        accommodations={props.accommodations}
        selected={props.selected}
      />
    );
  };

  const renderLoaderWhenLoading = () => {
    if (props.pagination.loading) return renderLoader();
  };

  const renderLoader = () => {
    return (
      <Box className={classes.nextPageProgressBox}>
        <CircularProgress />
      </Box>
    );
  };

  const renderCardListWithInfiniteScroll = () => {
    return (
      <InfiniteScroll
        dataLength={props.accommodations.length}
        hasMore={true}
        next={loadNextPage}
        loader={renderLoaderWhenLoading()}
      >
        {renderCardList()}
      </InfiniteScroll>
    );
  };

  const counter = () => {
    return props.loading ? (
      <Typography variant="h1">
        <Translate tkey={Keys.search.searching_accommodations} />
      </Typography>
    ) : (
      <Typography variant="h1">{foundAccommodationsLabel()}</Typography>
    );
  };

  const foundAccommodationsLabel = () => {
    const eqElements =
      props.pagination.filteredElements === props.pagination.elements;

    let interporlateValues = {};

    if (eqElements) {
      interporlateValues = { n: props.pagination.elements };
    } else {
      const { filteredElements: n, elements: m } = props.pagination;
      interporlateValues = { n, m };
    }

    return (
      <Translate
        tkey={Keys.search.x_accommodation_were_found}
        quantity={props.pagination.elements}
        values={interporlateValues}
      />
    );
  };

  const hasCards = props.accommodations.length > 0;

  return (
    <Grid container>
      <Grid item xs={12} className={classes.counter}>
        {counter()}
      </Grid>
      <Grid item xs={12}>
        {props.loading && (
          <Box className={classes.skeleton}>
            <Skeleton height={243} count={5} />
          </Box>
        )}
        {hasCards && renderCardListWithInfiniteScroll()}
      </Grid>
    </Grid>
  );
};

export default Result;
