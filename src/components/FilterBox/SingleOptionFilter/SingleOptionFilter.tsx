import React, { Component, MouseEvent, DOMElement } from 'react';
import SingleOption, {SingleOptionProp} from '../SingleOption/SingleOption';
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
      }
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

    return <div>
              <div className="otravo-title-2">
                {this.props.filter.label}
              </div>
              <div>
                {all}
              </div>
              <div>
                {options}
              </div>
              <div>
                {showMore}
              </div>
            </div>;
  } 
}

export default SingleOptionFilter;