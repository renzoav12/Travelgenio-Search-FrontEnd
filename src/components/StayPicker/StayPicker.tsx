import 'react-dates/initialize' // tslint:disable-line

import { Moment } from 'moment'
import React from 'react'
import { DateRangePicker } from 'react-dates'

export enum FocusedField {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}

type OnChangeHandler = (dates: { startDate?: Moment; endDate?: Moment }) => void

interface Props {
  calendars: 1 | 2
  startDate: Moment
  endDate: Moment
  min?: Moment
  max?: Moment
  onChange: OnChangeHandler
}

interface State {
  focusedInput?: FocusedField
}

class StayPicker extends React.Component<Props, State> {
  state = {
    focusedInput: FocusedField.START_DATE,
  }

  handleFocusChange = focusedInput => {
    this.setState({ focusedInput })
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
        <DateRangePicker
          startDateId="stayPicker_startDate"
          endDateId="stayPicker_endDate"
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          onDatesChange={this.handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={this.handleFocusChange}
          hideKeyboardShortcutsPanel={true}
          //navNext={<Icon type="rightArrow" />}
          //navPrev={<Icon type="leftArrow" />}
          noBorder={false}
          numberOfMonths={calendars}
          minimumNights={0}
          isOutsideRange={this.isOutsideRange}
        />
      </div>

    )
  }
}

export default StayPicker
