import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { ArrowLeft, ArrowRight, PlusCircle } from "react-feather";
import EventList from "../Event/EventList";
import Modal from "../Modals/Modal";
import EventForm from "../Event/EventForm"
import { getAllEvents } from "../store/events/actions";

const Calendar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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

  const listWeek = daysOfWeek.map((day, idnex) => (
    <div className="week" key={idnex}>
      {day}
    </div>
  ));
  const setPrevMonthDay = (lenthDays) => {
    let days = [];
    let lenthMonth = moment(`${yearNow}-${monthNow}`, "YYYY-MM").daysInMonth();
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
      prevYear--;
      setYearNow(prevYear);
    }
    prevMonth--;
    setMonthNow(prevMonth);
  };

  const setNextMonth = () => {
    let nextMonth = +monthNow;
    let nextYear = +yearNow;
    if (nextMonth >= 12) {
      nextMonth = 0;
      setYearNow(nextYear++);
    }
    nextMonth++;
    setMonthNow(nextMonth);
  };

  const setBorder = (name) => {
    const border = name === "Sunday" ? "danger" : "primary";
    return `border border-${border}`;
  };

  const formatClassName = (day) => {
    const border = setBorder(day.name);
    const selectDay =
      dayNow === day.num && day.name !== "prevMonth" ? "select-day" : "";
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

  const listDay = month.map((day, index) => (
    <div
      className={`${day.name} + ${formatClassName(day)}`}
      key={index}
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
            <Modal forElement="create-event" title="Create event" component={<EventForm event={{ date:dateNow }}/>} />
            <PlusCircle
              size="36"
              data-toggle="modal"
              data-target="#create-event"
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
