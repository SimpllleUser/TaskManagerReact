import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Divide } from "react-feather";
import moment from "moment";

const today = moment;

// const Calendar = () => {
//   let [selectYear, setYear] = useState(moment().format("YYYY"));
//   let [selectMonth, setMonth] = useState(moment().format("M"));
//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thus", "Fri", "Sut", "Sun"];
//   const size = 18;

//   const initMonth = () => {
//     const MonthYear = today().format("MM-YYYY");
//     let month = [];
//     let max_day = today(
//       `${selectMonth}-${selectMonth}`,
//       "YYYY-MM"
//     ).daysInMonth();
//     for (let i = 0; i < max_day; i++) {
//       let num = i + 1;
//       let name = today(`${num}-${MonthYear}`, "DD-MM-YYYY").format("dddd");
//       let data_day = { num, name };
//       month.push(data_day);
//     }
//     return month;
//   };

//   const setBorder = (name) => {
//     let border = name === "Sunday" ? "danger" : "primary";
//     return `border border-${border}`;
//   };

//   const selectDay = (day) => {
//     console.log("DAY", day);
//     // initMonth = []
//   };

//   const listDay = initMonth().map((day) => (
//     <div
//       className={"day " + setBorder(day.name)}
//       key={day.num}
//       onClick={() => {
//         selectDay(day.num);
//       }}
//     >
//       <div className="dayNum"> {day.num} </div>
//     </div>
//   ));

//   const listWeek = daysOfWeek.map((day) => (
//     <div className="week" key={day}>
//       {day}
//     </div>
//   ));

//   const nextMonth = () => {
//     if (selectMonth >= 12) {
//       selectMonth = 0;
//       setYear(+selectYear + 1);
//     }
//     setMonth(+selectMonth + 1);
//   };
//   const prevMonth = () => {
//     if (selectMonth <= 1) {
//       selectMonth = 13;
//       setYear(+selectYear - 1);
//     }
//     setMonth(+selectMonth - 1);
//   };

//   const nextYear = () => {
//     setYear(+selectYear + 1);
//   };
//   const prevYear = () => {
//     setYear = +selectYear <= 1 ? setYear(2020) : setYear(+selectYear - 1);
//   };

//   const nameMonth = (day) => {
//     return today(`${selectMonth}`).format("MMMM");
//   };

//   return (
//     <div>
//       <h1> Calendar</h1>
//       <div className="navigation-calendar year-header">
//         <div className="prev year" onClick={prevYear}>
//           <ArrowLeft size={size} />
//         </div>
//         <div className="name-year"> {selectYear} </div>
//         <div className="next year" onClick={nextYear}>
//           <ArrowRight size={size} />
//         </div>
//       </div>
//       <div className="navigation-calendar month-header">
//         <div className="prev month" onClick={prevMonth}>
//           <ArrowLeft size={size} />
//         </div>
//         <div className="name-month"> {nameMonth()} </div>
//         <div className="next month" onClick={nextMonth}>
//           <ArrowRight size={size} />
//         </div>
//       </div>
//       <div className="month">
//         {listWeek} {listDay}
//       </div>
//     </div>
//   );
// };

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectYaer: moment().format("YYYY"),
      selectMonth: moment().format("M"),
      // Формирование данных месяца в виде массива
      month: () => {
        const MonthYear = moment().format("MM-YYYY");
        let month = [];
        let max_day = moment(
          `${this.state.selectMonth}-${this.state.selectMonth}`,
          "YYYY-MM"
        ).daysInMonth();
        for (let i = 0; i < max_day; i++) {
          let num = i + 1;
          let name = moment(`${num}-${MonthYear}`, "DD-MM-YYYY").format("dddd");
          let data_day = { num, name };
          month.push(data_day);
        }
        return month;
      },
    };
  }
  render() {
      const listDay = this.state.month().map((day) => (
    <div
      className={"day " + day.name}
      key={day.num}

    >
      <div className="dayNum"> {day.num} </div>
    </div>
  ));
    return (
      <div>
        <h1>Month {console.log(this.state.month())} </h1>
      </div>
    );
  }
}

export default Calendar;
