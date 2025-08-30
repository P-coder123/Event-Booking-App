import { useEffect, useState } from "react";
import { getevents } from "../services/eventAPI";

import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);

  const callAPI = async () => {
    const result = await getevents();
    setEvents(result.data.allevents);
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <>
      <EventCard event={events} />
    </>
  );
};

export default EventList;
