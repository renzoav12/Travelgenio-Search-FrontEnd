import React, { Component, MouseEvent, DOMElement } from 'react';
import {KeyboardArrowDown, KeyboardArrowUp}  from '@material-ui/icons';

import './FilterHeader.scss';

interface Props {
  label: string;
  onChange: (display: boolean) => void;
}

interface State {
  display: boolean;
}

class FilterHeader extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {display: true};
  }

  toggleDisplay = (): void => {
    this.setState((prevState: State) => {     
      this.props.onChange(!prevState.display);

      return {
        display: !prevState.display
      };
    });    
  }


  render() {

    const display = this.state.display ? <KeyboardArrowUp/> : <KeyboardArrowDown/>;

    return <div className="otravo-title-2 otravo-filter-header" onClick={this.toggleDisplay}>
            <div>{this.props.label}</div>
            <div>{display}</div>
          </div>;
  } 
}

export default FilterHeader;