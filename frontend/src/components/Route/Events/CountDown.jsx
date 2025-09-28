import React, { useEffect, useState } from "react";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  function calculateTimeLeft() {
    const difference = +new Date(data.finish_date) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <div key={interval} className="  items-center mx-2">
        <span className="text-[25px] font-bold text-blue-600 rounded-lg px-2">
          {timeLeft[interval].toString().padStart(2, "0")}
        </span>
        <span className=" text-[25px] text-gray-600 capitalize">
          {interval}
        </span>
      </div>
    );
  });
  return (
    <div className=" flex flex-row ">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]"> Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
