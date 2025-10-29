import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../../redux/actions/event";
import Header from "../../Layout/Header";
import EventCard from "./EventCard";
import Loader from "../../Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {allEvents && allEvents.length !== 0 ? (
            <>
              {allEvents.map((event, index) => (
                <EventCard key={index} data={event} active={true} />
              ))}
            </>
          ) : (
            <p className="flex items-center justify-center font-Poppins text-[25px] p-4 mt-10">
              No Event Yet!
            </p>
          )}
        </>
      )}
    </>
  );
};

export default EventsPage;
