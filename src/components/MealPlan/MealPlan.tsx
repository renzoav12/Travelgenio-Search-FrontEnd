import React, {FunctionComponent} from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {ReactComponent as AllInclusive} from '../../assets/images/mealplan/allInclusive.svg';
import {ReactComponent as Meal} from '../../assets/images/mealplan/meal.svg';
import {ReactComponent as Breakfast} from '../../assets/images/mealplan/breakfast.svg';
import classNames from 'classnames';

export interface MealPlanProps {
  code: string;
  name: string;
  type: string;
};

interface MealPlanType {
  icon: any;
  class: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "inline-block"
    },
    mealPlanBox: {
      display: "flex",
      alignItems: "center",
      borderRadius: 15,
      height: 30,
      backgroundColor: "#028A51",
      marginTop: 10
    },
    mealPlan: {
      backgroundColor: "#E9EFF9",
      color: "#3D4355"
    },
    allInclusive: {
      backgroundColor: "#028A51",
      color: "white"
    },
    roomOnly: {
      backgroundColor: "#E9EFF9",
      color: "#3D4355",
      paddingLeft: 15
    },
    mealPlanIcon: {
      width: 30,
      height: 30,
      marginLeft: 18,
      marginTop:-20
    },
    mealPlanDescription: {
      paddingLeft: 10,
      paddingRight: 25
    }
  })
);

const MealPlan: FunctionComponent<MealPlanProps> = props => {
  const classes = useStyles();

  const mealPlanTypes: Map<String, MealPlanType> = new Map([
    ["all_inclusive", {icon: <AllInclusive className={classes.mealPlanIcon}/>, class: classes.allInclusive}],
    ["half_board", {icon: <Meal className={classes.mealPlanIcon}/>, class: classes.mealPlan}],
    ["full_board", {icon: <Meal className={classes.mealPlanIcon}/>, class: classes.mealPlan}],
    ["breakfast", {icon: <Breakfast className={classes.mealPlanIcon}/>, class: classes.mealPlan}],
    ["room_only", {icon: null, class: classes.roomOnly}]
  ]);
  
  const mealPlanType: MealPlanType | undefined = mealPlanTypes.get("room_only"/*props.type*/);

  if(mealPlanType) {
    return <Box className={classes.container}>
      <Box className={classNames(classes.mealPlanBox, mealPlanType.class)}>
        {mealPlanType.icon}
        <Box className={classes.mealPlanDescription}>
          {props.name}
        </Box>
      </Box>
    </Box>
  } else {
    return null;
  }
}

export default MealPlan;
