import 'react-dates/initialize' // tslint:disable-line

import { Moment } from 'moment'
import React from 'react'
import { DateRangePicker } from 'react-dates'

import './StayPicker.scss';

export enum FocusedField {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}

type OnChangeHandler = (dates: { startDate?: Moment; endDate?: Moment }) => void

interface StayPickerProps {
  calendars: 1 | 2
  startDate: Moment
  endDate: Moment
  min?: Moment
  max?: Moment
  onChange: OnChangeHandler
}

interface StayPickerState {
  focusedInput?: FocusedField
}

class StayPicker extends React.Component<StayPickerProps, StayPickerState> {
  state = {
    focusedInput: FocusedField.START_DATE
  }
  private focused: any = null;

  handleFocusChange = focusedInput => {
    this.setState({ focusedInput })
    this.focused = focusedInput;
  }

  handleDatesChange = ({ startDate, endDate }) => {
    const { focusedInput } = this.state
    if (focusedInput === FocusedField.END_DATE && endDate) {
      this.setState({ focusedInput: FocusedField.START_DATE })
      this.props.onChange({ startDate, endDate })
    } else if (focusedInput === FocusedField.START_DATE) {
      this.props.onChange({ startDate, endDate: undefined })
    } else {
      this.props.onChange({ startDate, endDate })
    }
  }

  isOutsideRange = date => {
    const { min, max } = this.props
    return (min && date.isBefore(min)) || (max && date.isAfter(max))
  }

  render() {
    const { calendars, startDate, endDate } = this.props
    const { focusedInput } = this.state
    return (
      <div>
        <div className="stay-picker-labels">
          <div className="stay-picker-label"><label className="otravo-label">Entrada:</label></div>
          <div className="stay-picker-label"><label className="otravo-label">Salida:</label></div>
        </div>
        <div>
          <DateRangePicker
            startDateId="stayPicker_startDate"
            endDateId="stayPicker_endDate"
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onDatesChange={this.handleDatesChange}
            focusedInput={this.focused}
            onFocusChange={this.handleFocusChange}
            hideKeyboardShortcutsPanel={true}
            //navNext={<Icon type="rightArrow" />}
            //navPrev={<Icon type="leftArrow" />}
            noBorder={true}
            numberOfMonths={calendars}
            minimumNights={0}
            isOutsideRange={this.isOutsideRange}
            customArrowIcon = {" "}
            displayFormat = {"DD MMM YYYY"}
            startDatePlaceholderText = {"Check In"}
            endDatePlaceholderText = {"Check Out"}
          />
        </div>
      </div>

    )
  }
}

export default StayPicker
