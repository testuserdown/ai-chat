import { useState, memo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());
  const [serverTime, setServerTime] = useState(0);
  const [activeUsers, setActiveUsers] = useState(55);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      function generateRandom() {
        return Math.floor(Math.random() * (70 - 50 + 1)) + 50;
      }
      setActiveUsers(generateRandom());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w100 df aic jcsb navbar">
      <p className="df aic gap-10">
        {location.pathname != "/" && (
          <button onClick={() => navigate("/")}>Go back</button>
        )}
        {activeUsers} <small>Current time active users</small>
      </p>
      <div className="df aic navbar__time">
        <button>Get Demo</button>
        <p className="df aic gap-10">
          Server Time:{" "}
          <span>
            {new Date(serverTime * 1000).toLocaleTimeString().slice(0, 4)}{" "}
            {new Date(serverTime * 1000).toLocaleTimeString().slice(8, 10)}
          </span>
        </p>
        <p className="df aic gap-10">
          Local Time: <span>{localTime}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(Navbar);
