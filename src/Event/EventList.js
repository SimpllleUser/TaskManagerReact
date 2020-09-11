import React from "react";
import { connect, useDispatch,useSelector } from "react-redux";
import { getAllTasks } from "../store/tasks/actions";
import { getAllEvents } from "../store/events/actions";

import EventCard from "./EventCard";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const EventList = (props) => {

  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(getAllTasks())
      dispatch(getAllEvents())
    },[]
  )

  const tasks = useSelector((state) => state.tasks.tasks);
  const events = useSelector((state) => state.events.events);

  const filter_event = events.filter(
    (e) => e.date === props.select_date
  );
  return (
    <div id="event-list">
    <h1> Список событий</h1>
    {filter_event.map((event) =>
        <EventCard key={event.id} event={event}>
        </EventCard>
    )}
  </div>
  )

}


  // componentDidMount() {
  //   this.props.getAllTasks();
  // }
  // render() {
    // const filter_event = this.props.events.filter(
    //   (e) => e.date === this.props.select_date
    // );
    // if(filter_event.length >  0){
    // return (
      // <div id="event-list">
      //   <h1> Список событий</h1>
      //   {filter_event.map((event) =>
      //       <EventCard key={event.id} event={event}>
      //       </EventCard>
      //   )}
      // </div>
//     );
//   }else{
//     return(
//       <div>
//         <h5>По выбранной дате событий нет</h5>
//       </div>
//     )
//   }
// }

// }
// const mapDispatchToProps = {
//   getAllTasks,
// };

// const mapStateToProps = (state) => {
//   return {
//     events: state.calendar.events.concat(state.tasks.tasks),
//     tasks: state.tasks.tasks,
//   };
// };

export default EventList;
