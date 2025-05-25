import { useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./TimerPage.css";

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TimerPage = () => {
  const { seconds } = useParams();
  const location = useLocation();
  const initialTime = parseInt(seconds || "0");
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // 🧪 Parse les query params
  const queryParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      color: (params.get("color") && `#${params.get("color")}`) || "#eeeeee",
      border1:
        (params.get("bordertop") && `#${params.get("bordertop")}`) || "#6200be",
      border2:
        (params.get("borderbottom") && `#${params.get("borderbottom")}`) ||
        "#048a0f",
      style: params.get("style") || "vortex",
      font: decodeURIComponent(params.get("font") || "Orbitron"),
      decoration: params.get("decoration") === "true",
    };
  }, [location.search]);

  useEffect(() => {
    if (isNaN(initialTime) || initialTime <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  if (isNaN(initialTime)) {
    return null;
  }

  const getDecorationPath = (style: string) => {
    return `/assets/${style}.png`;
  };

  return (
    <div className={`timer-wrapper ${queryParams.style}`}>
      <div
        className={`vortex-loader style-${queryParams.style}`}
        style={{
          borderTopColor: queryParams.border1,
          borderBottomColor: queryParams.border2,
          boxShadow:
            queryParams.style === "lovecraft"
              ? `0 0 20px ${queryParams.border1}, 0 0 60px ${queryParams.border2} inset`
              : "unset",
        }}
      />
      {queryParams.decoration && (
        <img
          src={getDecorationPath(queryParams.style)}
          alt={`${queryParams.style} decoration`}
          className={`decoration-img style-${queryParams.style}`}
        />
      )}

      <div
        className="timer-display"
        style={{ color: queryParams.color, fontFamily: queryParams.font }}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default TimerPage;
