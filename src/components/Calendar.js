import React from "react";
import moment from "moment";
import { ArrowLeft, ArrowRight } from "react-feather";
import CalendarEvent from "./CalendarEvent";
//** * !Реализовать получение выбраной даты в календаре через props function !!! */
class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format('DD-MM-YYYY'),
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      selectMonth: moment().format("M"),
      selectYear: moment().format("YYYY"),
      prevMonthDay: (lenthDays) => {
        let day = 0;
        let days = [];
        let lenthMonth = moment(
          `${this.state.selectYear}-${this.state.selectMonth}`,
          "YYYY-MM"
        ).daysInMonth();
        for (let i = 0; i < lenthDays; i++) {
          const num = lenthMonth - i;
          days.push({ num, name: "prevMonth" });
        }
        days = days.reverse();
        return lenthDays > 0 ? days : "";
      },
      month: () => {
        let month = [];
        let max_day = moment(
          `${this.state.selectYear}-${this.state.selectMonth}`,
          "YYYY-MM"
        ).daysInMonth();
        for (let i = 0; i < max_day; i++) {
          let num = i + 1;
          let name = moment(
            `${this.state.selectYear}-${this.state.selectMonth}-${num}`
          ).format("dddd");
          let data_day = { num, name };
          month.push(data_day);
        }
        let firstElem = month[0].name;
        let lenthEmptDay = this.state.daysOfWeek.findIndex(
          (m) => m === firstElem
        );
        let prevMonthDay = this.state.prevMonthDay(lenthEmptDay);
        return prevMonthDay ? [...prevMonthDay, ...month] : month;
      },
      selectDay: "",
    };
  }
  selectDate = (day) => {
    const date = moment(
      `${this.state.selectMonth}-${day}-${this.state.selectYear}`
    ).format("DD-MM-YYYY");
    this.setState({date})
    console.log(date,this.state.selectMonth);
  };

  selectDay = (day) => {
    this.setState({ selectDay: day.num });
    this.selectDate(day.num);
  };

  setBorder = (name) => {
    let border = name === "Sunday" ? "danger" : "primary";
    return `border border-${border}`;
  };

  formatClassName = (day) => {
    const border = this.setBorder(day.name);
    const selectDay =
      this.state.selectDay === day.num && day.name != "prevMonth"
        ? "select-day"
        : "";
    return `day ${border} ${selectDay}`;
  };

  nextMonth = () => {
    let selectMonth = +this.state.selectMonth;
    let selectYear = +this.state.selectYear;
    if (selectMonth >= 12) {
      selectMonth = 0;
      selectYear++;
    }
    selectMonth++;
    this.setState({ selectMonth, selectYear });
  };
  prevMonth = () => {
    let selectMonth = +this.state.selectMonth;
    let selectYear = +this.state.selectYear;
    if (selectMonth <= 1) {
      selectMonth = 13;
      selectYear--;
    }
    selectMonth--;
    this.setState({ selectMonth, selectYear });
  };

  nextYear = () => {
    let selectYear = +this.state.selectYear;
    selectYear++;
    this.setState({ selectYear });
  };
  prevYear = () => {
    let selectYear = +this.state.selectYear;
    selectYear--;
    if (selectYear <= 1) {
      selectYear = 2020;
    }
    this.setState({ selectYear });
  };

  nameMonth = (day) => {
    return moment(`${this.state.selectMonth}`).format("MMMM");
  };

  render() {
    const size = 48;
    const listWeek = this.state.daysOfWeek.map((day) => (
      <div className="week" key={day}>
        
        {day}
      </div>
    ));

    const listDay = this.state.month().map((day) => (
      <div
        className={`${this.formatClassName(day)} ${day.name}`}
        key={day.num + day.name}
        onClick={() => {
          this.selectDay(day);
        }}
      >
        <div className="dayNum"> {day.num} </div>
      </div>
    ));
    return (
      <div>
        <h1> Календарь </h1>
        <div className="navigation-calendar year-header">
          <div className="prev year" onClick={this.prevYear}>
            <ArrowLeft size={size} />
          </div>
          <div className="name-year"> {this.state.selectYear} </div>
          <div className="next year" onClick={this.nextYear}>
            <ArrowRight size={size} />
          </div>
        </div>
        <div className="navigation-calendar month-header">
          <div className="prev month" onClick={this.prevMonth}>
            <ArrowLeft size={size} />
          </div>
          <div className="name-month"> {this.nameMonth()} </div>
          <div className="next month" onClick={this.nextMonth}>
            <ArrowRight size={size} />
          </div>
        </div>
        <div className="month">
          
          {listWeek} {listDay}
        </div>
        <div className="calendar-event col-6 border">
          <CalendarEvent />
        </div>
      </div>
    );
  }
}

export default Calendar;
