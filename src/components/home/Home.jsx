import React, { useState, useEffect } from "react";
import axios from "axios";
import Score from "./Score";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError } from "../../redux/acticeUser";
import play from "../../dist/sound/src_sounds_play.mp3";
import corect from "../../dist/sound/src_sounds_correct.mp3";
import wrowng from "../../dist/sound/src_sounds_wrong.mp3";

import useSound from "use-sound";
function Home() {
  const [data, setData] = useState({}); // data store qustion that active
  const [numberQ, setNumberQ] = useState(1); // store number qustion
  const [score, setScore] = useState(0); // store score user
  const [time, setTime] = useState(60); // store time qustion
  const error = useSelector((state) => state.ActiveUserSlice.error); // get error status from redux
  const logdin = useSelector((state) => state.ActiveUserSlice.logdin); // get logdin status from redux
  const navigat = useNavigate();
  const dispatch = useDispatch();
  const [plays] = useSound(play);
  const [wrowngs, { stop }] = useSound(wrowng);
  const [corects] = useSound(corect);



  //  this function check corect answer or note
  const check = (e, ans, corectAnswer, scores) => {
    // ans is answer that user select
    if (ans === corectAnswer) {
      e.target.classList.add("corect"); // add class correct to corect answer
      corects(); // play correct
      setScore((preve) => preve + scores); // update score
      if (time <= 6) {
        e.target.classList.remove("corect"); //  // remov class correct to corect answer after 1.5 second
        if (numberQ < 12) {
          // update number qustion
          setNumberQ((prev) => ++prev);
        } else {
          dispatch(setError(true)); // if numberQ >12 this statement will be executed to go score page
          sessionStorage.setItem("score", score); // store score to setionStorage to use it in score page
          setScore(0); // rest score
        }
      } else {
        setTimeout(() => {
          e.target.classList.remove("corect"); //  // remov class correct to corect answer after 1.5 second
          if (numberQ < 12) {
            // update number qustion
            setNumberQ((prev) => ++prev);
          } else {
            dispatch(setError(true)); // if numberQ >12 this statement will be executed to go score page
            sessionStorage.setItem("score", score); // store score to setionStorage to use it in score page
            setScore(0); // rest score
          }
        }, 7000);
      }
    } 
    else {
      // if answer not corect this block will be executed
      e.target.classList.add("not-corect");
      wrowngs(); // play wrong
      sessionStorage.setItem("score", score); // store score to setionStorage to use it in score page
      setScore(0); // rest score
      setTimeout(() => {
        e.target.classList.remove("not-corect");
        dispatch(setError(true));
        setNumberQ(1);
      }, 7000);
    }
  };

  useEffect(() => {
    if (!logdin) {
      navigat("/register");
    }
  }, [logdin, navigat]);

  useEffect(() => {
    // play audio
    if (!error) {
      plays();
    }
  }, [error, plays]);

  useEffect(() => {
    // fetch qustion active from api
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://millionaires.glitch.me/question?id=${numberQ}`
        );
        setData(res.data[0]);
      } catch (error) {}
    };
    fetch();
  }, [numberQ]);

  useEffect(() => {
    // set timer
    let intervel = setInterval(() => {
      setTime((preve) => preve - 1);
    }, 1000);
    return () => {
      clearInterval(intervel);
    };
  }, [numberQ]);

  useEffect(() => {
    // rest timer if numberQ change
    setTime(60);
  }, [numberQ]);
  useEffect(() => {
    // fire dispatch error if timer become < 0
    if (time <= 0) {
      dispatch(setError(true));
      wrowngs();
      if(error){
        stop()
      }
      setTime(30);
      setNumberQ(1);
      sessionStorage.setItem("score", score);
      setScore(0);
    }
  }, [dispatch, error, score, stop, time, wrowngs]);
  // this efect restart time
  useEffect(() => {
    // reset timer if user chose answer not corect
    setTime(60);
  }, [error]);

  return (
    <div className="Home  py-5">
      <div className="container py-5 h-100 d-flex align-items-center justify-content-center">
        {!error ? (
          <>
            <header>
              <div className="content d-flex justify-content-between px-5 ">
                <div className="scores p-1 rounded-circle  d-flex align-items-center justify-content-center ">
                  <span>{score}</span>
                </div>
                <div className="time p-1 rounded-circle d-flex align-items-center justify-content-center">
                  <span>{time}</span>
                </div>
              </div>
            </header>
            <div className="questions text-center  px-0 px-md-2 py-5 mt-5 w-100">
              <div className="question p-1 rounded-2 mb-4  ">
                <h3 className="fw-bolder p-2">{data.question}</h3>
              </div>

              <div className="answers ">
                <div className="row g-3">
                  {data.answers
                    ? data.answers.map((ans, index) => {
                        return (
                          <div
                            className="answer col-12 col-md-6"
                            key={index}
                            onClick={(e) =>
                              check(
                                e,
                                ans,
                                data.answers[data.correctIndex],
                                data.score
                              )
                            }>
                            <div className="ans p-2 rounded-2 fw-bold">
                              {ans}
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Score score={score} />
        )}
      </div>
    </div>
  );
}

export default Home;
