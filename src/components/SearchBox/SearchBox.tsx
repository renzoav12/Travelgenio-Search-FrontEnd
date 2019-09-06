import React, { Component } from 'react';
import StayPicker from '../StayPicker/StayPicker';
import moment, { Moment } from 'moment'
import 'react-dates/lib/css/_datepicker.css';

interface SearchBoxProps {
    onClick: (asd: String) => any;
}

interface SearchBoxState {
    type: string,
    code: string,
    from: Moment,
    to: Moment,
    occupancy: string;
}

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = {
            type: 'city',
            code: '123',
            from: moment(),
            to: moment(),
            occupancy: '2-1-1'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
    }

    handleSubmit(event: any) {
        //alert('A name was submitted: ' + this.state);
        event.preventDefault();
        this.props.onClick('hola');
    }

    handleStayPickerChange = (dates) => {
        this.setState({ from: dates.startDate, to: dates.endDate });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="searchBox_code">
                    Search:<input id="searchBox_code" type="text" value={this.state.code} />
                </label>
                <StayPicker calendars={2} startDate={this.state.from} endDate={this.state.to} onChange={this.handleStayPickerChange}></StayPicker>
                <label>
                    Occupancy:<input type="text" value={this.state.occupancy} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default SearchBox;
