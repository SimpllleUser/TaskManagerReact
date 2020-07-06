import React from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import moment from "moment";

// const today = moment;

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       daysOfWeek : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      selectMonth:moment().format("M"),
      selectYear:moment().format("YYYY"),
      prevMonthDay: (lenthDays) => {
        let day = 0
        let days = []
        let lenthMonth = moment(
         `${this.state.selectYear}-${this.state.selectMonth}`,
         "YYYY-MM"
       ).daysInMonth();
       for (let i = 0; i < lenthDays; i++) {
         const num =  lenthMonth - i
           days.push({num, name: 'prevMonth'})
       }
       days = days.reverse() 
       return lenthDays > 0 ? days : '' 
      },
      month: () => {
        let month = []
        let max_day = moment(
          `${this.state.selectYear}-${this.state.selectMonth}`,
          "YYYY-MM"
        ).daysInMonth();
        for (let i = 0; i < max_day; i++) {
          let num = i + 1;
          let name = moment(`${this.state.selectYear}-${this.state.selectMonth}-${num}`).format('dddd')
          let data_day = { num, name };
          month.push(data_day);
        }
        let firstElem = month[0].name
        let lenthEmptDay = this.state.daysOfWeek.findIndex(m => m == firstElem )
        let prevMonthDay = this.state.prevMonthDay(lenthEmptDay)
        return  prevMonthDay ? [...prevMonthDay, ...month] : month
      },
    };
  }

  selectDay = (day) => {
    console.log("DAY", day);
  };

   nextMonth = () => {
     let selectMonth = +this.state.selectMonth
     let selectYear = +this.state.selectYear
    if (selectMonth >= 12) {
      selectMonth = 0
      selectYear++
    }
    selectMonth++
    this.setState({selectMonth, selectYear})
 }
 prevMonth = () => {
  let selectMonth = +this.state.selectMonth
  let selectYear = +this.state.selectYear
    if (selectMonth <= 1) {
      selectMonth = 13;
      selectYear--
        }
    selectMonth--
    this.setState({selectMonth, selectYear})
  };

 nextYear = () => {
  let selectYear = +this.state.selectYear
  selectYear++
  this.setState({selectYear})
};
 prevYear = () => {
  let selectYear = +this.state.selectYear
  selectYear--
  if(selectYear <= 1){
    selectYear = 22020
  }
  this.setState({selectYear})
  };

  nameMonth = (day) => {
    return moment(`${this.state.selectMonth}`).format("MMMM");
  };

  render() {
    var size = 48
    // 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Tuesday','Sunday'
    // const daysOfWeek = {}
      const listWeek = this.state.daysOfWeek.map((day) => (
        <div className="week" key={day}>
      {day}
    </div>
  ));

    const setBorder = (name) => {
    let border = name === "Sunday" ? "danger" : "primary";
    return `border border-${border}`;
  };
    const listDay = this.state.month().map((day) => (
    <div
      className={day.name != 'prevMonth' ? "day " + setBorder(day.name) : "day " + 'prevMonth'}
      key={day.num + day.name}
      onClick = {() => {this.selectDay(day)}}
    >
      <div className="dayNum">{day.num}</div>
    </div>
  ));
    return (
      <div>
         <h1 > Calendar </h1>
      <div className="navigation-calendar year-header">
        <div className="prev year" onClick={this.prevYear}>
          <ArrowLeft size={size} />
        </div>
        <div className="name-year">{this.state.selectYear}</div>
        <div className="next year" onClick={this.nextYear}>
          <ArrowRight size={size} />
        </div>
      </div>
      <div className="navigation-calendar month-header">
        <div className="prev month" onClick={this.prevMonth}>
          <ArrowLeft size={size} />
        </div>
        <div className="name-month">{this.nameMonth()}</div>
        <div className="next month" onClick={this.nextMonth}>
          <ArrowRight size={size} />
        </div>
      </div>
      <div className="month">
        {listWeek}
        {listDay}
      </div> 
      </div>
    );
  }
}

export default Calendar;
