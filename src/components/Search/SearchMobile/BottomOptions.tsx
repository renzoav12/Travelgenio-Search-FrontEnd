import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box, Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
            fontSize: "115%"
        }
    })
);

const BottomOptions: FunctionComponent<ModalBottomProps> = (props, context) => {
    const classes = useStyles();
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
        <LocationOnIcon style={{ color: "#357dbb" }} onClick={() => {
            selectModalMap(ViewType.Map);
        }} />
    );

    const getModalListView = () => {
        return (
            <Box className={"modal-bottom-map"}>
                <Box className={"modal-content-bottom-map"} style={divStyle} >
                    <Grid item xs={12} >
                        <Box className={classes.filter} onClick={() => { selectModalMap(ViewType.List); }}>
                            <ViewListIcon style={{ color: "#357dbb" }} />
                            <span className={classes.listar}>Listar</span>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        );
    }

    const getModalBottom = () => {
         return (
                           
                <Box className={"modal-bottom"} style={divStyle} >
                    <Box className={"modal-content-bottom"}  >
                        <Grid item xs={12} >
                            <Box className={classes.filter}>
                                <FilterListIcon style={{ color: "#357dbb" }} onClick={selectModalFilter} />
                              <span >Filtrar | </span>  &nbsp;
                            {icons}
                              <span>Mapa  | </span> &nbsp;
                        <SwapVertIcon style={{ color: "#357dbb" }} onClick={selectModalSort} />
                            <span>Ordenar </span>
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
