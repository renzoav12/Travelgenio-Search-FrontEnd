import React, { Component, MouseEvent, DOMElement } from 'react';
import SingleOption, {SingleOptionProp} from '../SingleOption/SingleOption';
import {KeyboardArrowDown, KeyboardArrowUp}  from '@material-ui/icons';

import './SingleOptionFilter.scss';

interface Props {
  filter: SingleOptionFilterProp;
  initialShowQty: number;
  onChange: (field:string, code: string, selected: boolean) => void;
}

export interface SingleOptionFilterProp {
  field: string;
  label: string;
  options: Array<SingleOptionProp>;
}

interface State {
  showAll: boolean;
  optionsShowQty: number;
}



class SingleOptionFilter extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showAll: false,
      optionsShowQty: props.initialShowQty 
    };
  }

  toggleShowAll = (): void => {
    this.setState((prevState: State) => {      
      return {
        showAll: !prevState.showAll,
        optionsShowQty: prevState.showAll ? this.props.initialShowQty : this.props.filter.options.length
      };
    });    
  }

  render() {
    const options = this.props.filter.options
      .slice(0, this.state.optionsShowQty)
      .map(option =>
        <SingleOption 
          key={option.code} 
          option={option} 
          onChange={(selected: boolean):void => {this.props.onChange(this.props.filter.field, option.code, selected)}}/>
      );

    const showMore = this.state.showAll 
    ? <div className="otravo-small-button" onClick={this.toggleShowAll}>Mostrar sólo {this.props.filter.options.length} <KeyboardArrowUp/></div>
    : <div className="otravo-small-button" onClick={this.toggleShowAll}>Mostrar los {this.props.filter.options.length} <KeyboardArrowDown/></div>;

    return <div>
              <div className="otravo-title-2">
                {this.props.filter.label}
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