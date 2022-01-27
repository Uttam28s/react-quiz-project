import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Options from "../Common/Options";
import Question from "../Common/Question";

const QuizIndex = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [qid, setQid] = useState(0);
  const [navigation, setNavigation] = useState("");
  const [ansObj, setansObj] = useState({});
  const [score, setScore] = useState(0);
  useEffect(() => {
    setQid(parseInt(params.qid));
  }, [state, params.qid]);

  const handleBack = () => {
    if (qid) {
      navigate(`/quiz/${state[0].category}/question/${qid - 1}`, {
        state: state,
      });
      setNavigation("back");
    }
  };

  const handleNext = () => {
    if (state.length === qid + 1) {
      let newScore = score;
      if (Object.values(ansObj).includes(state[params.qid]["correct_answer"])) {
        newScore = score + 1;
        setScore(score + 1);
      }
      localStorage.setItem(`${params.id}`, newScore);
      navigate("/");
    } else {
      if (Object.values(ansObj).includes(state[params.qid]["correct_answer"])) {
        setScore(score + 1);
      }
      navigate(`/quiz/${state[0].category}/question/${qid + 1}`, {
        state: state,
      });
    }
    setNavigation("next");
  };
  const defaultAnsObj = (data) => {
    let obj = ansObj;
    obj[params.qid] = data[params.qid];
    setansObj(obj);
  };

  return (
    <div className="question-box">
      <div className="title">
        <div
          onClick={() => {
            navigate("/");
            setNavigation("");
          }}
          className="pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </div>
        <h3>{state[0].category}</h3>
        <div></div>
      </div>
      <div className="title">
        <p>
          Total:- {qid + 1} / {state.length}
        </p>
        <p>{`Difficulty : ${state[params.qid].difficulty}`}</p>
      </div>
      <div>
        <Question data={state[params.qid]} />
        <Options
          data={state[params.qid]}
          navigation={navigation}
          incorrect={state[params.qid]["incorrect_answers"]}
          correct={state[params.qid]["correct_answer"]}
          ansObj={ansObj}
          defaultAnsObj={defaultAnsObj}
        />
        <div className="button-wrraper">
          <button
            disabled={params.qid === "0"}
            onClick={handleBack}
            className="button"
          >
            Back
          </button>
          <button onClick={handleNext} className="button">
            <div>Next</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizIndex;
