import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const Card = ({ title, handleStartQuiz, data }) => {
  const [score, setScore] = useState(false);
  useEffect(() => {
    let score = localStorage.getItem(data[0].category);
    if (score) {
      setScore(score);
    }
  }, [data]);
  return (
    <div className="quiz-card-wrapper">
      <p>{title}</p>
      <div className="card-score-wrapper">
        <span>{score ? `Score: ${score}/${data.length}` : "Not started!"}</span>
        <button onClick={() => handleStartQuiz(data)}>
          {score ? "Redo" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Card;
