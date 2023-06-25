import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
viewProfileThunk, viewTopAgentThunk
} from "../services/auth-thunks";

const FollowersListItem = (
    {
        follower
    }
) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-6">
                    <div className="fw-bold">{follower.username}</div>
                    <div>@{follower.first_name}</div>
                </div>
                
                <div className="col-6">
                
                <button className="col btn btn-primary rounded-pill float-end"
                    
                    onClick={async () => {
                        await dispatch(viewProfileThunk(follower.username));
                        let url = '/house/profile/' + follower.username;
                        navigate(url);
                    }}>View Profile</button>
                
                </div>
            </div>
        </li>
    );
};
export default FollowersListItem;
