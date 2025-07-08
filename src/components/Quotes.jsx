import React, { useEffect, useState } from "react";

function Quotes() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    randQuote();
  }, []);

  function randQuote() {
    const quotes = [
      "성공의 비결은 시작한 일을 꾸준히 해나가는 것이다.",
      "열정은 성공의 엔진이다. 멈추지 않는 한, 당신은 계속 나아갈 것이다.",
      "위대한 성공은 작은 성공들이 모여 이루어진다. 오늘의 작은 승리를 축하하라.",
      "모멘텀은 가장 강력한 성공의 도구다. 일단 움직이기 시작하면, 멈추기 어렵다.",
      "성공한 사람은 결코 포기하지 않는다. 포기하는 사람은 결코 성공하지 못한다.",
      "당신의 비전을 향한 불타는 열정이 모든 장애물을 녹일 것이다.",
      "성공은 목적지가 아니라 여정이다. 그 여정 자체를 즐겨라.",
      "가장 큰 위험은 아무런 위험도 감수하지 않는 것이다. 안주하지 말고 계속 도전하라.",
      "매일 아침 당신을 침대에서 뛰쳐나오게 만드는 목표를 가져라.",
      "성공의 정점에서 더욱 겸손하고, 더욱 배우고, 더욱 갈망하라.",
    ];
    const quote = quotes[Math.ceil(Math.random() * 10) - 1];
    setQuote(quote);
  }

  return <div className="quote">"{quote}"</div>;
}

export default Quotes;
