import React from "react";
import moment from "moment";

const today = moment;

const initMonth = () => {
  const MonthYear = today().format("MM-YYYY");
  let month = [];
  let max_day = today(`2020-9`, "YYYY-MM").daysInMonth();
  for (let i = 0; i < max_day; i++) {
    let num = i + 1;
    let name = today(`${num}-${MonthYear}`, "DD-MM-YYYY").format("dddd");
    let data_day = { num, name };
    month.push(data_day);
  }
  return month;
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thus", "Fri", "Sut", "Sun"] 

const listDay = initMonth().map((day) => (
  <div className={"day " + day.name } key={day.num}>
    <div className="dayNum">{day.num}</div>
    {/* {day.name} */}
  </div>
));

const listWeek = daysOfWeek.map((day) => (
  <div className="week" key={day}>{day}</div>
))


const Calendar = () => {
  return (
    <div>
      <h1> Calendar </h1>
      <div className="month">
         {listWeek}
         {listDay}
          </div>

      {console.log(initMonth())}
    </div>
  );
};

export default Calendar;
