import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
viewProfileThunk
} from "../services/auth-thunks";

const WhoToFollowListItem = (
    {
        who = { userName: 'NASA', handle: 'NASA', avatarIcon: 'nasa.png' }
    }
) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" height={48} src={`/images/${who.avatarIcon}`} />
                </div>
                <div className="col-8">
                    <div className="fw-bold">{who.userName}</div>
                    <div>@{who.handle}</div>
                </div>
                <div>
                <button className="btn btn-primary rounded-pill float-end"
                    onClick={async () => {
                        await dispatch(viewProfileThunk(who.userName));
                        let url = '/house/profile/' + who.userName;
                        navigate(url);
                    }}>View Profile</button>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary rounded-pill float-end">Follow</button>
                </div>
            </div>
        </li>
    );
};
export default WhoToFollowListItem;
