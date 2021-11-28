import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import {
  Typography,
} from "@mui/material";

// ----------------------------------------------------------------

export default function Timer(initTime, submitHandler) {
  
  // Time
  const Ref = useRef(null);
  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(total / 1000 / 3600);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the begining of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } 
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer(`00:00:00`);

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    // This is where you need to adjust if
    // you extend to add more time
    let hours = Math.floor(initTime.initTime / 60);
    let minutes = initTime.initTime % 60;
    deadline.setHours(deadline.getHours() + hours);
    deadline.setMinutes(deadline.getMinutes() + minutes);
    return deadline;
  };

  // We can use useEffect so that when the component mount the timer will start as soon as possible

  // We put empty array to act as componentDidmount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <Typography variant="h4" sx={{ p: 7 }}>
    Đồng hồ: {timer}
  </Typography>
  )
}
