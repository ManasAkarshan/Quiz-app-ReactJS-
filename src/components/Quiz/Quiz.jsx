import React, { useState, useRef } from "react";
import "./Quiz.css";
import {data} from '../../assets/data'

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [questionsObj, setQuestionsObj] = useState(data[index])
  const [lock, setLock] = useState(false)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(false)

  const opt1 = useRef(null)
  const opt2 = useRef(null)
  const opt3 = useRef(null)
  const opt4 = useRef(null)

  let option_array = [opt1, opt2, opt3, opt4];

  const checkAns = (e, ans)=>{
    if(lock === false){
        if(questionsObj.ans === ans ){
            e.target.classList.add("correct")
            setLock(true)
            setScore(score+1)
        }
        else{
            e.target.classList.add("wrong")
            setLock(true)
            option_array[questionsObj.ans-1].current.classList.add("correct")
        }
    }
  }

  const next = ()=>{
    if(lock === true){
        if(index === data.length-1){
            setResult(true)
            // return 0
        }
        else{
            setIndex(++index)
            setQuestionsObj(data[index]);
            setLock(false)
            // option_array.map((opt)=>{
            //     opt.current.classList.remove("wrong")
            //     opt.current.classList.remove("correct")
            //     return null 
            // })   
            //OR
            option_array.forEach((opt)=>{
                opt.current.classList.remove("wrong")
                opt.current.classList.remove("correct")
                return null
            })
        }
    }
  }

  const retry = ()=>{
    let ind = 0
    // setIndex(0);
    setIndex(ind);
    // setQuestionsObj(data[0])
    setQuestionsObj(data[ind])
    setResult(false)
    setScore(false)
    setLock(false)
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result && 
        <div className="result">
            Your score is {score} out of {data.length}
            <button onClick={retry}>Retry</button>
        </div>
      }
      {!result && <>
        <h2>{index+1}.{questionsObj.question}</h2>
        <ul>
            <li ref={opt1} onClick={(e)=>{checkAns(e, 1)}}>{questionsObj.option1}</li>
            <li ref={opt2} onClick={(e)=>{checkAns(e, 2)}}>{questionsObj.option2}</li>
            <li ref={opt3} onClick={(e)=>{checkAns(e, 3)}}>{questionsObj.option3}</li>
            <li ref={opt4} onClick={(e)=>{checkAns(e, 4)}}>{questionsObj.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index" >{index+1} of {data.length} questions</div>
      </>}
    </div>
  );
};

export default Quiz;
