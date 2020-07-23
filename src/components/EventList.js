import React from "react";
import { connect } from "react-redux";
import { getAllTasks } from "../redux/actions";
import EventCard from "./EventCard";
import { NavLink } from "react-router-dom";

class EventList extends React.Component {

  componentDidMount() {
    this.props.getAllTasks();
  }

  render() {
    const filter_event = this.props.events.filter(
      (e) => e.date === this.props.select_date
    );

    return (
      <div id="event-list">
        <h1> Список событий</h1>
        {filter_event.map((event) =>
          event.status ? (
            <NavLink
              to={`/detail-task/${event.id}`}
              key={event.id}
              id="event-task"
            >
              
              <EventCard key={event.id} event={event}>
                
              </EventCard>
            </NavLink>
          ) : (
            <EventCard key={event.id} event={event}>
              
            </EventCard>
          )
        )}
      </div>
    );
  }
}
const mapDispatchToProps = {
  getAllTasks,
};

const mapStateToProps = (state) => {
  return {
    events: state.calendar.events.concat(state.tasks.tasks),
    tasks: state.tasks.tasks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
