import React, { PureComponent } from "react"
import MomentUtils from "material-ui-pickers/utils/moment-utils"
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider"
import TimePicker from "material-ui-pickers/TimePicker"
import DatePicker from "material-ui-pickers/DatePicker"
import DateTimePicker from "material-ui-pickers/DateTimePicker"

export default class StaffTimePicker extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          value={this.props.selectedDate}
          onChange={this.props.onSelectDate}
        />
      </MuiPickersUtilsProvider>
    )
  }
}
