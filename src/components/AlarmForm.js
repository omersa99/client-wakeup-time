import React, { useState, useEffect } from "react"
import DateTimePicker from "react-datetime-picker"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-calendar/dist/Calendar.css"
import "react-clock/dist/Clock.css"
import axios from "axios"

const AlarmForm = () => {
  const [value, onChange] = useState(new Date())

  useEffect(() => {
    console.log("Selected date:", value)
  }, [value])

  const handleSave = () => {
    const formattedDate = value.toISOString()
    axios
      .post("http://127.0.0.1:5000/api/alarm", { alarmTime: formattedDate })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <DateTimePicker onChange={onChange} value={value} />
      <button onClick={handleSave}>Post Time</button>
    </div>
  )
}
export default AlarmForm
