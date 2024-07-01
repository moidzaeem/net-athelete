import { useState } from "react";
import AllEvents from "./pages/AllEvents";
import EventCalender from "./pages/EventCalender";

const EventPage = () => {
  const [showEvents, setshowEvents] = useState("allevents");
  return (
    <div>
      {showEvents === "allevents" && <AllEvents setshowEvents={setshowEvents} />}
      {showEvents === "eventcalender" && <EventCalender />}
    </div>
  );
};

export default EventPage;
