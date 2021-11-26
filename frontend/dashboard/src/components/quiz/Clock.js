import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { makeStyles } from "@material-ui/core";

// ----------------------------------------------------------------

const useStyles = makeStyles({
  clock: {
    display: "flex",
    fontFamily: "sans-serif",
    textAlign: "center",
    margin: "auto",
    padding: "20px",
    width: "35%",
  },
  time: {
    fontSize: "32px",
  },
});

const minuteSeconds = 60;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div>
      <div>{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => (time / minuteSeconds) | 0;

export default function Clock(props) {
  // const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  // const endTime = startTime + 243248; // use UNIX timestamp in seconds

  // const remainingTime = endTime - startTime;
  const initTime = props.initTime;
  const remainingTime = initTime * minuteSeconds;
  const minutesDuration = remainingTime;
  const classes = useStyles();
  return (
    <div className={classes.clock}>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#EF798A"]]}
        duration={minutesDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) =>
          renderTime("minutes", getTimeMinutes(minutesDuration - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#218380"]]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0,
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("seconds", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
    </div>
  );
}
