import React from "react";
import { connect } from "react-redux";
import { getAllTasks } from "../redux/actions";
import EventCard from "./EventCard"
import Task from "./Task";

class EventList extends React.Component {

    // constructor(props){
    //     super(props)
    // }

    componentDidMount() {
        this.props.getAllTasks();
    }
    render(){
        return <div id="event-list">
                <h1>Event list</h1>
                {console.log('event-list',this.props.events)}
                {
                    this.props.events.map((event) => (

                        event.status ? <div className="event-task bg-primary"><h6>Task</h6><EventCard key={event} event={event}></EventCard></div> : <EventCard key={event} event={event}></EventCard> 
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