import React, { useEffect, useState } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  function calculateTimeLeft() {
    const difference = +new Date("2025-08-30") - +new Date();
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
        <span className="text-[30px] font-bold text-blue-600 bg-gray-100 rounded-lg px-4 py-2 shadow-md">
          {timeLeft[interval].toString().padStart(2, "0")}
        </span>
        <span className=" text-[40px] text-gray-600 capitalize">
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
