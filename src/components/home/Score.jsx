import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../redux/acticeUser";
import axios from "axios";
function Score() {
  const id = sessionStorage.getItem("id");
  const [user, setUser] = useState({});
  const activeUser = useSelector((state) => state.ActiveUserSlice.activeId);
  const dispatch = useDispatch();

  let score = sessionStorage.getItem("score");
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://millionaires.glitch.me/user?id=${activeUser ? activeUser : id}`
        );
       
        setUser(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [activeUser, id]);
  return (
    <div className="score  col-12 col-md-8 fw-bold">
      <div className="card mb-3 p-0 ">
        <div className="row g-0">
          <div className="col-3  rounded-start">
            <img
              src={user.file ? user.file : null}
              className="img-fluid h-100 rounded-start"
              alt="user"
            />
          </div>
          <div className="col-9 ">
            <div className="card-body">
              <h5 className="card-title">
                Hi {user.name ? user.name.split(" ")[0] : null}
              </h5>
              <p className="card-text">
                {score > 0 ? "congratulations" : "Goodluck"}{" "}
                {user.name ? user.name.split(" ")[0] : null}{" "}
                {score > 0 ? "You have won" : "Tray agine"}{" "}
                {score > 0 ? score + "$" : null}
              </p>
              <p className="card-text">
                <button
                  className="fw-bold rounded p-2"
                  onClick={() => {
                    dispatch(setError(false));
                  }}>
                  Tray agine
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Score;
