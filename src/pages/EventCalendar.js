import React from "react";
import Calendar from "../components/Calendar";
import Loader from "../components/Loader"

const EventCalebdar = () => (
  <div>
    <h2 className="text-center pb-5 ">Календарь событий</h2>
    <Calendar />
  </div>
);

export default EventCalebdar;
