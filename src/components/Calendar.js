import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ArrowLeft, ArrowRight, PlusCircle } from "react-feather";
import EventList from "../Event/EventList";
import Modal from "./Modal";
import { getAllEvents } from "../store/events/actions";
import { getAllTasks } from "../store/tasks/actions";
//import { connect } from "react-redux";

//** * !Реализовать получение выбраной даты в календаре через props function !!! */
const Calendar = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
    dispatch(getAllEvents());
  }, []);
  const [dateNow, setDateNow] = useState(moment().format("DD-MM-YYYY"));
  const [yearNow, setYearNow] = useState(moment().format("YYYY"));
  const [monthNow, setMonthNow] = useState(moment().format("M"));
  const [dayNow, setDayNow] = useState(+moment().format("D"));
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const listWeek = daysOfWeek.map((day) => (
    <div className="week" key={day}>
      {day}
    </div>
  ));
  const setPrevMonthDay = (lenthDays) => {
    let days = [];
    let lenthMonth = moment(
      `${yearNow}-${monthNow}`,
      "YYYY-MM"
    ).daysInMonth();
    for (let i = 0; i < lenthDays; i++) {
      const num = lenthMonth - i;
      days.push({ num, name: "prevMonth" });
    }
    days = days.reverse();
    return lenthDays > 0 ? days : "";
  };

  const month = (() => {
    let month = [];
    let max_day = moment(`${yearNow}-${monthNow}`, "YYYY-MM").daysInMonth();

    for (let i = 0; i < max_day; i++) {
      let num = i + 1;
      let name = moment(`${yearNow}-${monthNow}-${num}`).format("dddd");
      let data_day = { num, name };
      month.push(data_day);
    }
    let firstElem = month[0].name;
    let lenthEmptDay = daysOfWeek.findIndex((m) => m === firstElem);
    let prevMonthDay = setPrevMonthDay(lenthEmptDay);
    return prevMonthDay ? [...prevMonthDay, ...month] : month;
  })();

  const setPrevMonth = () => {
    let prevMonth = +monthNow;
    let prevYear = +yearNow;
    if (prevMonth <= 1) {
      setMonthNow(13);
      prevYear--
      setYearNow(prevYear);
    }
    prevMonth--
    setMonthNow(prevMonth);
  };

  const setNextMonth = () => {
    let nextMonth = +monthNow;
    let nextYear = +yearNow;
    if (nextMonth >= 12) {
      nextMonth = 0;
      setYearNow(nextYear++);
    }
    nextMonth++
    setMonthNow(nextMonth);
    console.log(monthNow)
  };

  const setBorder = (name) => {
    const border = name === "Sunday" ? "danger" : "primary";
    return `border border-${border}`;
  };

  const formatClassName = (day) => {
    const border = setBorder(day.name);
    const selectDay =
    dayNow === day.num && day.name !== "prevMonth"
      ? "select-day"
      : "";
      return `day ${border} ${selectDay}`;
  };

  const setSelectDate = (day) => {
    const date = moment(`${monthNow}-${day}-${yearNow}`).format("DD-MM-YYYY");
    setDateNow(date);
  };

  const setSelectDay = (day) => {
    setDayNow(day.num);
    setSelectDate(day.num);
  };

  const listDay = month.map((day) => (
    <div
      className={`${day.name} + ${formatClassName(day)}`}
      key={day.num + day.name}
      onClick={() => {
        setSelectDay(day);
      }}
    >
      <div
        className="dayNum"
        data-toggle="modal"
        data-target={"#date-" + day.num + day.name}
      ></div>
      {day.num}
    </div>
  ));

  const getMonthName = () => moment(`${monthNow}`).format("MMMM");

  const size = 48;

  return (
    <div className="calendar-block">
      <div className="calnedar">
        <div className="navigation-calendar border-bottom">
          <div className="month-navigation">
            <div className="prev month" onClick={() => setPrevMonth()}>
              <ArrowLeft size={size} />
            </div>
            <div className="name-month"> {getMonthName()} </div>
            <div className="name-year"> {yearNow} </div>
            <div className="next month" onClick={() => setNextMonth()}>
              <ArrowRight size={size} />
            </div>
          </div>

          <div
            className="dayNum"
            data-toggle="modal"
            data-target={"#date-" + dayNow}
          >
            <Modal date={dateNow} forElement="form-create-event" />
            <PlusCircle
              size="36"
              data-toggle="modal"
              data-target=".form-create-event"
            />
          </div>
        </div>
        <div className="month">
          {listWeek} {listDay}
        </div>
      </div>
      <div className="event-list">
        <EventList select_date={dateNow} />
      </div>
    </div>
  );
};

export default Calendar;
