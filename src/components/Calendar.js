import React from "react";
import moment from 'moment'

const today = moment

const test = () => {
    console.log("WORK")
}
const initMonth = () => {
  const week_day = ['Mon','Tue','Wed', 'Thus', 'Fri', 'Sut', 'Sun']
  const MonthYear = today().format('MM-YYYY')
  let month = []
  let max_day = today(`2020-9`,"YYYY-MM").daysInMonth()
  for (let i = 0; i < max_day; i++) {
    let num = i + 1
    let name = today(`${num}-${MonthYear}`, 'DD-MM-YYYY').format('dddd')
    let data_day = {num, name}
    month.push(data_day) 
  }
  return month
}

const Calendar = () => {
  return (
    <div>
      <h1>Calendar</h1>
      {console.log(initMonth())}
    </div>
  );
};

export default Calendar;
