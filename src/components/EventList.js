import React from "react";
import { connect } from "react-redux";
import { getAllTasks } from "../redux/actions";
import EventCard from "./EventCard"
import { NavLink } from "react-router-dom";

class EventList extends React.Component {

    componentDidMount() {
        this.props.getAllTasks();
    }

    render(){
        return <div id="event-list">
                <h1>Event list</h1>
                {
                    this.props.events.map((event) => (
                        event.status ? <NavLink to={`/detail-task/${event.id}`} key={event.id}id="event-task"><EventCard key={event.id} event={event}></EventCard></NavLink> : <EventCard key={event.id} event={event}></EventCard> 
                    ))
                }
            </div>
    }

}
const mapDispatchToProps = {
    getAllTasks
  };

const mapStateToProps = (state) => {
    return {
        events: state.calendar.events.concat(state.tasks.tasks),
        tasks: state.tasks.tasks
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);