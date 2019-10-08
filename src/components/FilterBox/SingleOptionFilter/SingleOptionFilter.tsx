import React, { Component, MouseEvent, DOMElement } from 'react';
import SingleOption, {SingleOptionProp} from '../SingleOption/SingleOption';
import FilterHeader from '../FilterHeader/FilterHeader';
import {KeyboardArrowDown, KeyboardArrowUp}  from '@material-ui/icons';

import './SingleOptionFilter.scss';

interface Props {
  filter: SingleOptionFilterProp;
  initialShowQty: number;
  onChange: (field:string, code: string, selected: boolean) => void;
  onCleanSelection: (field:string) => void;
}

export interface SingleOptionFilterProp {
  field: string;
  label: string;
  options: Array<SingleOptionProp>;
}

interface State {
  showAll: boolean;
  showOptionsQty: number;
  optionAll: SingleOptionProp;
  display: boolean;
}



class SingleOptionFilter extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showAll: false,
      showOptionsQty: props.initialShowQty,
      optionAll: {
        code: "",
        label: "Todos",
        quantity: this.props.filter.options.map(option => option.quantity).reduce((sum,current) => sum + current, 0),
        selected: !this.props.filter.options.some(option => option.selected)
      },
      display: true
    };
  }

  toggleShowAll = (): void => {
    this.setState((prevState: State) => {      
      return {
        showAll: !prevState.showAll,
        showOptionsQty: prevState.showAll ? this.props.initialShowQty : this.props.filter.options.length
      };
    });    
  }

  onChangeDisplay = (display: boolean): void => {
    this.setState((prevState: State) => {      
      return {
        display: display
      };
    });    
  }

  onSelectAll = (selected: boolean) => {
    this.setSelectAll(true);
    this.props.onCleanSelection(this.props.filter.field);
  }

  onChangeSelection = (code: string, selected: boolean) : void => {
    this.setSelectAll(
      !selected 
      && !this.props.filter.options
        .filter(option => option.code !== code)
        .some(option => option.selected)
    );

    this.props.onChange(this.props.filter.field, code, selected);
  }

  setSelectAll = (selected: boolean): void => {
    this.setState((prevState: State) => {      
      
      let optionAll: SingleOptionProp = prevState.optionAll;
      optionAll.selected = selected;

      return { optionAll: optionAll };
    });    
  }

  render() {

    const all = <SingleOption 
                  key={this.state.optionAll.code} 
                  option={this.state.optionAll} 
                  onChange={this.onSelectAll}/>


    const options = this.props.filter.options
      .slice(0, this.state.showOptionsQty)
      .map(option =>
        <SingleOption 
          key={option.code} 
          option={option} 
          onChange={(selected: boolean):void => {this.onChangeSelection(option.code, selected)}}/>
      );

    const showMore = this.state.showAll 
    ? <div className="otravo-small-button" onClick={this.toggleShowAll}>Mostrar sólo {this.props.filter.options.length} <KeyboardArrowUp/></div>
    : <div className="otravo-small-button" onClick={this.toggleShowAll}>Mostrar los {this.props.filter.options.length} <KeyboardArrowDown/></div>;

    const filterBody = this.state.display
    ? <div>
        <div> {all} </div>
        <div> {options} </div>
        <div className="otravo-show-more-filter-options"> {showMore} </div>
      </div>
    : null;

    return <div>
              <div>
                <FilterHeader label={this.props.filter.label} onChange={this.onChangeDisplay}/>
              </div>
              {filterBody}
            </div>;
  } 
}

export default SingleOptionFilter;