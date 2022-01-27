import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import Card from "../Common/Card";
import "./Dashboard.css";

const Dashboard = ({ allQuizData }) => {
  const [quizData, setQuizData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setQuizData(_.groupBy(allQuizData, "category"));
  }, [allQuizData]);

  const handleStartQuiz = (data) => {
    navigate(`/quiz/${data[0].category}/question/${0}`, {
      state: data,
    });
  };

  return (
    <div className="dashboard-wrapper">
      {/* <h3>Dashboard</h3> */}
      <div className="card-list-wrapper">
        {Object.keys(quizData).map((val) => (
          <Card
            title={quizData[val][0].category}
            data={quizData[val]}
            handleStartQuiz={handleStartQuiz}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
