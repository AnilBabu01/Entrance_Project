import { useState, useEffect } from "react";

export const useTimer = (timeString?: string) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeOver, setIsTimeOver] = useState(false);

  useEffect(() => {
    if (!timeString) return;

    // Convert "HH:MM:SS" to total seconds
    const timeParts = timeString.split(":").map(Number);
    const totalSeconds =
      (timeParts[0] || 0) * 3600 +
      (timeParts[1] || 0) * 60 +
      (timeParts[2] || 0);

    setTimeLeft(totalSeconds);
    setIsTimeOver(false); // Reset when time is updated
  }, [timeString]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeOver(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return { time: formatTime(), isTimeOver };
};

export function parseTime(timeString: string) {
  if (!timeString) return "0 min"; // Handle undefined case

  const [hours, minutes] = timeString.split(":").map(Number);

  if (hours === 0) {
    return `${minutes} min`; // If hours is 0, return minutes
  } else if (minutes === 0) {
    return `${hours} hrs`; // If minutes is 0, return hours
  } else {
    return `${hours} hrs and ${minutes} min`; // Both hours and minutes
  }
}

export const dateToMonthName = (dateStr: string) => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};
