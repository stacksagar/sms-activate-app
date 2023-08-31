import React, { useState, useEffect } from "react";

const Countdown = ({ createdAt }: { createdAt: Date }) => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - createdAt.getTime();

    const initialCountdown = Math.max(
      Math.floor(20 * 60 - timeDifference / 1000),
      0
    );

    setCountdown(initialCountdown);

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div>
      {minutes} minutes {seconds} seconds
    </div>
  );
};

export default Countdown;
