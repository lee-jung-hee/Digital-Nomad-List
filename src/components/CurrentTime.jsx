import { useEffect, useState } from "react";

function CurrentTime({ time }) {
  const [realtime, setRealtime] = useState(time(new Date()));
  useEffect(() => {
    const curTm = setInterval(() => {
      setRealtime(time(new Date()));
    }, 1000);

    return () => {
      clearInterval(curTm);
    };
  }, [time]);
  return <div className="time">{realtime}</div>;
}

export default CurrentTime;
