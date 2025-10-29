import React, { useEffect } from "react";
import styles from "../../../styles/styles";
import EventCard from "./EventCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../../redux/actions/event.js";
import Loader from "../../Layout/Loader.jsx";
const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        <div className=" w-full grid">
          <EventCard data={allEvents && allEvents[0]} />
        </div>
      </div>
    </div>
  );
};

export default Events;
