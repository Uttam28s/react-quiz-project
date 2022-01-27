import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import QuizIndex from "./Component/QuizIndex";

const App = () => {
  const [quizData, setQuizData] = useState({});
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=25")
      .then((res) => res.json())
      .then((result) => {
        setQuizData(result.results);
      });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard allQuizData={quizData} />} />
        <Route path="/quiz/:id/question/:qid" element={<QuizIndex />} />
      </Routes>
    </div>
  );
};

export default App;
