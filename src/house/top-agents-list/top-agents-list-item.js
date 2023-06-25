import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { viewProfileThunk } from "../services/auth-thunks";

const WhoToFollowListItem = ({ who, currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-6">
          <div className="fw-bold">{who.username}</div>
          <div>@{who.first_name}</div>
        </div>

        <div className="col-6">
          <button
            className="col btn btn-primary rounded-pill float-end"
            onClick={async () => {
              await dispatch(viewProfileThunk(who.username));
              let url =
                currentUser && currentUser._id === who._id
                  ? "/house/profile"
                  : "/house/profile/" + who.username;
              navigate(url);
            }}
          >
            View Profile
          </button>
        </div>
      </div>
    </li>
  );
};
export default WhoToFollowListItem;
