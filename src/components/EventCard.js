import React from "react";

const EventCard = (props) =>{
    return (
        <div id="event-card" className="event card">
        <h3 className="evet-title card-header"> {props.event.title} </h3>
        <p className="evet-description card-text"> {props.event.description} </p>
      </div>
    )
}

export default EventCard