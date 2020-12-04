import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box, Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme, useTheme  } from "@material-ui/core/styles";
import './ModalBottom.scss';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ValueFilterProp } from '../../FilterBox/ValueFilter/ValueFilter';
import { RangeFilterProp } from '../../FilterBox/RangeFilter/RangeFilter';
import { SingleOptionFilterProp } from '../../FilterBox/SingleOptionFilter/SingleOptionFilter';
import { RangeOptionFilterProp } from '../../FilterBox/RangeOptionFilter/RangeOptionFilter';
import { FilterBoxSelected } from "../../FilterBox/FilterBox";
import ModalFilter from "./ModalFilter";
import ModalSort from "./ModalSort";
import './ModalFilter.scss';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { ViewType } from '../../SearchBar/SearchBar';
import { SortField } from '../../../model/search';
import ViewListIcon from "@material-ui/icons/ViewList";
import Translate from "@hotels/translation";
import Keys from "@hotels/translation-keys";
import { useMediaQuery } from "@material-ui/core";

export interface ModalBottomProps {
    displayModal: boolean;
    filters: Map<
        string,
        | ValueFilterProp
        | RangeFilterProp
        | SingleOptionFilterProp
        | RangeOptionFilterProp
    >;
    onChangeFilter: (filter: FilterBoxSelected) => void;
    loading: boolean;
    display: boolean;
    title: JSX.Element;
    viewSelected?: ViewType;
    onChange: (view: ViewType) => void;
    showViewIcons: boolean;
    sortFields: SortField[];
    sort: (field: string, order: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filter: {

        },
        container: {
            [theme.breakpoints.down("xs")]: {
                display: "inherit"
            },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        icon: {
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.divider,
            borderRadius: 5,
            width: 32,
            height: 32,
            marginRight: 10,
        },
        selected: {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        listar: {
            paddingLeft: 6,
            fontSize: "115%",
            
        },
        nameBottom: {
            fontSize: 12,
            position: "relative",
            [theme.breakpoints.down("xs")]: {
                top: -3 
            },
            [theme.breakpoints.up("xs")]: {
                top: -3
            }
        }
    })
);

const BottomOptions: FunctionComponent<ModalBottomProps> = (props, context) => {
    const theme = useTheme();
    const classes = useStyles();

    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const xs = useMediaQuery(theme.breakpoints.down("xs"));

    const [modalFilter, setModalFilter] = useState<boolean>(false);
    const [displayFilter, setDisplayFilter] = useState<boolean>(props.display);

    const [modalSort, setModalSort] = useState<boolean>(false);
    const [displaySort, setDisplaySort] = useState<boolean>(props.display);


    const [listView, setListView] = useState(true);
    const [mapView, setMapView] = useState(false);


    const divStyle = {
        display: props.displayModal ? 'block' : 'none'
    };

    const getFilterShow = () => {
        if (props.loading === true) {
            setModalFilter(!modalFilter);
            setDisplayFilter(!displayFilter);
            return null;
        }
        return (
            <Box className={"ModalFilter"}>
                <ModalFilter
                    displayModal={modalFilter}
                    closeModal={selectModalFilter}
                    filters={props.filters}
                    onChange={props.onChangeFilter}
                    loading={props.loading}
                    display={props.display}
                />
            </Box>
        );
    }

    const getOrderShow = () => {
        if (props.loading === true) {
            setModalSort(!modalSort);
            setDisplaySort(!displaySort);
            return null;
        }
        return (
            <Box className={"ModalSort"}>
                <ModalSort
                    displayModal={modalSort}
                    closeModal={selectModalSort}
                    showViewIcons={props.showViewIcons}
                    sortFields={props.sortFields}
                    sort={props.sort}
                />
            </Box>
        );
    }
    useEffect(() => {
        setDisplayFilter(props.display);
        setDisplaySort(props.display);
    }, [props.display]);


    const selectModalFilter = () => {
        setDisplayFilter(!displayFilter);
        setModalFilter(!modalFilter);
    }


    const selectModalSort = () => {
        setDisplaySort(!displaySort);
        setModalSort(!modalSort);
    }

    const selectModalMap = (viewType: ViewType) => {
        setListView(viewType.valueOf() === ViewType.List.valueOf());
        setMapView(viewType.valueOf() === ViewType.Map.valueOf());
        props.onChange(viewType);
    }

    const getFilter = () => {
        return displayFilter ? getFilterShow() : null;
    }

    const getOrder = () => {
        return displaySort ? getOrderShow() : null;
    }

    const icons: JSX.Element | null = (
        <LocationOnIcon style={{ color: "#357dbb" }} />
    );

    const getModalListView = () => {
        return (
            <Box className={xs ? "modal-bottom-map" : "modal-bottom-map-sm"}>
                <Box className={xs ? "modal-content-bottom-map" : "modal-content-bottom-map-sm"} style={divStyle} >
                    <Grid item xs={12} >
                        <Box className={classes.filter} onClick={() => { selectModalMap(ViewType.List); }}>
                            <ViewListIcon style={{ color: "#357dbb" }} />&nbsp;
                            <span className={classes.nameBottom}><Translate tkey={Keys.search.see_list} /> </span>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        );
    }

    const getModalBottom = () => {
        return (

            <Box className={ xs ? "modal-bottom" : "modal-bottom-sm"} style={divStyle} >
                <Box className={xs ? "modal-content-bottom" : "modal-content-bottom-sm"}  >
                    <Grid item xs={12} >
                        <Box className={classes.filter}>
                            <FilterListIcon style={{ color: "#357dbb" }} />
                            <span className={classes.nameBottom} onClick={selectModalFilter}><Translate tkey={Keys.search.filter_by} /> |</span>
                            {icons}
                            <span className={classes.nameBottom} onClick={() => { selectModalMap(ViewType.Map); }}><Translate tkey={Keys.search.see_map} /> |</span>
                            <SwapVertIcon style={{ color: "#357dbb" }} />
                            <span className={classes.nameBottom} onClick={selectModalSort} ><Translate tkey={Keys.search.sort_by} /> </span>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        );
    }

    return (
        <Grid container >
            {mapView === true ? getModalListView() : getModalBottom()}
            <Grid item xs={12}>
                {getFilter()}
            </Grid>
            <Grid item xs={12}>
                {getOrder()}
            </Grid>
        </Grid>
    );

}

export default BottomOptions;
