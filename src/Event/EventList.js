import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../store/events/actions";

import EventCard from "./EventCard";
import { useEffect } from "react";

const EventList = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const events = useSelector((state) => state.events.events);

  const filter_event = events && events.filter((e) => e.date === props.select_date);
  return (
    <div id="event-list">
      <h1> Список событий</h1>
      {filter_event.map((event) => (
        <EventCard key={event.id} event={event}></EventCard>
      ))}
    </div>
  );
};

export default EventList;
