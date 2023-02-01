import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import {
  BsArrowReturnLeft,
  WiTime8,
  BsArrowRight,
  BsCheck2Square,
} from "react-icons/all";
import "./property.css";
import { actionQuizList, actionCreateAnswer } from "../../redux/actions/quiz";

const alphaOrder = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SellMyProperty = () => {

  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(0);

  const [textValue, setTextValue] = useState("");

  const [answerList, setAnswerList] = useState([]);
  const [clickedList, setClickedList] = useState([]);

  const [maxString, setMaxString] = useState(0);

  const dispatch = useDispatch();

  const quizs = useSelector((state) => state.quiz.quizData);

  

  
  useEffect(() => {
    dispatch(actionQuizList());
    
  }, []);

  const handleKeyPress = (evt) => {
    
    // goToNextStage();
    // evt.preventDefault();
    if(evt.key === 'Enter'){
      if ( currentPage == 0) startSell();
      else if( currentPage == quizs.length + 1) finishSell();
      else {
        //console.log(textValue);
        if(quizs[currentPage - 1].type == "TEXT")
          saveNextPage(quizs[currentPage - 1], currentPage - 1);
      }
    }
    // evt.preventDefault();
  }

  useEffect(() => {
    
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress,false);
    }
  }, [currentPage, textValue, answerList])
  const startSell = () => {
    setCurrentPage(1);
  };
  const saveNextPage = (item, index) => {
    const obj = answerList.findIndex((o) => o.quiz_id == item.id);
    if (obj != -1) {
      if (item.type == "TEXT") {
        answerList[obj].answer = textValue;
      }
      else {
        answerList[obj].answer = JSON.stringify(clickedList);
      }
      
    } else {
      if (item.type == "TEXT") {
        answerList.push({
          quiz_id: item.id,
          answer: textValue,
          index:index + 1,

        });
      } else {
        answerList.push({
          quiz_id:item.id,
          answer:JSON.stringify(clickedList),
          index:index + 1,
        })
      }
    }

    setAnswerList(answerList);

    initStage(-1);

    goToNextStage();
  };

  const clickedSingle = (item, type) => {

    if (type == "SINGLE") {
      clickedList[0] = item;
    } else {
      const index = clickedList.findIndex((o) => o == item);
      if (index != -1) {
        clickedList.splice(index, 1);
      } else {
        clickedList.push(item);
      }
    }
    
    setClickedList([...clickedList]);

  };
  const initStage = (index) => {
    setMaxString(0);

    const obj = answerList.findIndex((o) => o.index == index);
    
    if(obj != -1) {
      if(answerList[obj] != undefined) {
        const answer = JSON.parse(answerList[obj].answer);
        setClickedList(answer);
      }
      
    }
    else {
      setTextValue("");
      setClickedList([]);
    }
    
  }
  const goToNextStage = () => {
    

    if( currentPage >= quizs.length + 1) return;
    setCurrentPage(currentPage + 1);
    initStage(currentPage + 1);
    
  };
  const gotoPreviousStage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
    initStage(currentPage - 1);
    
  };

  
  const callMaxString = (answers) => {
      JSON.parse(answers).map((answer) => {
        if(maxString < answer.length)
          setMaxString(answer.length);
      });
  }


  const finishSell = () => {
    dispatch(actionCreateAnswer(answerList, history));
  }

  
  const renderFirstPage = () => {
    return (
      <div
        style={{ padding: "7% 20%", backgroundColor: "white", height: "100vh" }}
        
      >
        <Fade bottom delay={500}>
          <div className="text-center">
            <img
              src="/imgs/sellmyproperty/logo.png"
              style={{ width: "40%" }}
            ></img>
          </div>
          <div className="d-font-book text-center mt-10">
            <div className="d-text-48 d-highlight">
              Apply below to sell your property on Tokized.immo
            </div>
            <div className="d-text-32 d-black mt-3">
              Get an all cash offser, sell in a matter of days.
            </div>
            <div className="mt-7" style={{ marginLeft: "15%" }}>
              <Button
                onClick={startSell}
                className="d-text-24"
                style={{ width: "120px", color: "black" }}
                
              >
                START
              </Button>
              <span style={{ color: "#5F5B5A", marginLeft: 5 }}>
                press Enter
                <BsArrowReturnLeft className="d-font-bold ml-2" />
              </span>
            </div>
            <div className="mt-4">
              <span style={{ color: "#5F5B5A", marginLeft: 5 }}>
                <WiTime8 className="mr-2" />
                Takes 1 minutes 30 seconds
              </span>
            </div>
          </div>
        </Fade>
      </div>
    );
  };
  const renderQuestions = () => {
    return (
      <div
        style={{
          padding: "20% 12% 0% 25%",
          backgroundColor: "white",
          height: "100vh",
        }}
        className="d-font-book"
      >
        {quizs.map((item, index) => (
          <div
            style={{ display: index + 1 == currentPage ? "initial" : "none" }}
            key={index}
          >
             { index + 1 == currentPage ? callMaxString(item.panswer) : ""}
            <div className="d-text-48 d-font-book">
              <span className="d-highlight">
                {" "}
                {currentPage} <BsArrowRight className="d-font-bold" />
              </span>
              <span className="ml-2">{item.title}</span>
            </div>
            {item.type == "TEXT" ? (
              <div className="form-group ml-3 d-text-48 mt-3" style={{ width: "80%" }}>
                <input
                  type="text"
                  className="form-control property-form"
                  placeholder="Type your answer here..."
                  onChange={(e) => setTextValue(e.target.value)}
                ></input>
              </div>
            ) : (
              <div className="ml-3 mt-3 d-text-28">
                { item.type == "MULTIPLE" ?(
                  <div className="d-text-14" style={{marginLeft:23, color:"#796f65"}}>Choose as many as you like</div>
                ):""}
                { item.panswer && JSON.parse(item.panswer).map((item1, index1) => (
                  <div
                    className= { clickedList.length > 0 && clickedList.includes(item1) ? "multi-item-active d-flex align-items-center":"multi-item d-flex align-items-center"}
                    onClick={() => clickedSingle(item1, item.type)}
                    style={{ width: 90 + maxString * 10}}
                    key ={ index1}
                  >
                    <div className="multi-card">{alphaOrder[index1]}</div>
                    <div className="multi-card-text"> {item1}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 ml-3">
              <Button
                onClick={() => saveNextPage(item, index)}
                className="d-text-24"
                style={{ width: "120px", color: "white" }}
              >
                OK
                <BsCheck2Square
                  className="ml-2"
                  style={{ verticalAlign: "text-bottom", fontSize: 14 }}
                />
              </Button>
              { item.type == "TEXT" ? (<span style={{ color: "#5F5B5A", marginLeft: 20 }}>
                press Enter
                <BsArrowReturnLeft className="d-font-bold ml-2" />
              </span>):""}
              
            </div>

            <div
              className="d-flex justify-content-end align-items-end"
              // style={{ marginTop: item.type == "TEXT"? 150:50 }}
              style={{ position: "absolute",bottom: "10%",right: "7%" }}
            >
              <div style={{ marginRight: 10 }}>
                <Button
                  onClick={() => gotoPreviousStage()}
                  className="d-text-24"
                  variant="secondary"
                  style={{
                    width: 35,
                    height: 35,
                    color: "white",
                    backgroundColor: "#796F65",
                    borderTopRightRadius:0,
                    borderBottomRightRadius:0,
                    marginRight:2,
                  }}
                >
                  <img src="/imgs/sellmyproperty/up.png" />
                </Button>
                <Button
                  onClick={() => goToNextStage()}
                  className="d-text-24"
                  variant="secondary"
                  style={{
                    width: 35,
                    height: 35,
                    color: "white",
                    backgroundColor: "#796F65",
                    borderTopLeftRadius:0,
                    borderBottomLeftRadius:0,
                  }}
                >
                  <img src="/imgs/sellmyproperty/down.png" />
                </Button>
              </div>
              <div
                className="text-center"
                style={{
                  padding:"5px 10px",
                  height: 35,
                  backgroundColor: "#dba87e",
                  borderRadius: 5,
                  color: "white",
                }}
              >
                powered By <b>Tokized</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };



  const renderLastPage = () => {
    return (
      <div
        style={{ padding: "7% 5%", backgroundColor: "white", height: "100vh",  }}
      >
        <Fade bottom delay={500}>
          <div className="d-font-book text-center" style={{marginTop:"35vh"}}>
            <div className="d-text-48 d-highlight">
              Thank you for your submission
            </div>
            <div className="d-text-32 d-black mt-3" style={{margin:"0 25%" }}>
              Our team will review your information and get back to you as soon as possible if your property meets our   criteria.
            </div>
            <div className="mt-7" style={{ marginLeft: "15%" }}>
              <Button
                onClick={finishSell}
                className="d-text-24"
                style={{ width: "120px", color: "black", }}
              >
                FINISH
              </Button>
              <span style={{ color: "#5F5B5A", marginLeft: 5 }}>
                press <b>Enter</b>
                <BsArrowReturnLeft className="d-font-bold ml-2" />
              </span>
            </div>
          </div>
        </Fade>
      </div>
    )
  }
  return <>{currentPage == 0 ? renderFirstPage() : currentPage < quizs.length + 1 ? renderQuestions():renderLastPage()}</>;
  //return <>{renderLastPage()}</>;
};

export default SellMyProperty;
