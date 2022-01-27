import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Index.css";

const Options = ({ incorrect, correct, navigation, defaultAnsObj, ansObj }) => {
  const [optionsArray, setOptionsArray] = useState([]);
  const [ans, setAns] = useState(false);
  let params = useParams();
  useEffect(() => {
    setAns(false);
    if (!incorrect.includes(correct) && navigation !== "back") {
      incorrect.splice(
        Math.floor(Math.random() * (incorrect.length + 1)),
        0,
        correct
      );
      setOptionsArray(incorrect);
    }
    if (incorrect.includes(correct)) {
      setOptionsArray(incorrect);
    }
  }, [incorrect, correct, navigation]);

  return (
    <div className="">
      <div className="option-box">
        {optionsArray.map((val) => (
          <div
            onClick={() => {
              setAns(val);
              let obj = {};
              obj[params.qid] = val;
              defaultAnsObj(obj);
            }}
            className="option pointer"
          >
            <input
              type="radio"
              name="option"
              className="radio"
              value={ans}
              checked={
                ansObj && Object.keys(ansObj).includes(params.qid)
                  ? ansObj[params.qid] === val
                    ? true
                    : false
                  : ans && ans === val
                  ? true
                  : false
              }
            />

            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
