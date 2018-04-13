import React, { PureComponent } from "react"
import MomentUtils from "material-ui-pickers/utils/moment-utils"
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider"
import TimePicker from "material-ui-pickers/TimePicker"
import DatePicker from "material-ui-pickers/DatePicker"
import DateTimePicker from "material-ui-pickers/DateTimePicker"

export default class StaffTimePicker extends PureComponent {
  state = {
    selectedDate: new Date()
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
  }

  render() {
    const { selectedDate } = this.state

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TimePicker value={selectedDate} onChange={this.handleDateChange} />
      </MuiPickersUtilsProvider>
    )
  }
}
