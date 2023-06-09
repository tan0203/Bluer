import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";
import { getSuggestions } from "../../redux/actions/suggestionsAction";
import Sponsores from "./Sponsored";
import Sponsored from "./Sponsored";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="mt-3">
      <UserCard user={auth.user} />

      <div className="d-flex justify-content-between align-items-center my-2">
        <h5 className="text-danger">Suggestions for you</h5>
        {!suggestions.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>

      {suggestions.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
      <div className="Sponsored text-danger">
        <h1>Sponsored</h1>
        <Sponsored></Sponsored>
        <div className="Sponsoredbot">
          <p className="advertisementt ">LAMEILA - Official Store</p>
          <p className="advertisementt ">lameila.vn</p>
        </div>
      
      </div>
      <div style={{ opacity: 0.5 }} className="my-2">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          style={{ wordBreak: "break-all" }}
        ></a>
        <small className="d-block">Welcome to Bluer</small>

        <small>&copy; 2023</small>
      </div>
    </div>
  );
};

export default RightSideBar;
