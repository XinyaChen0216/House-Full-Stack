import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewTopAgentThunk } from "../services/auth-thunks";
import FollowersListItem from "./followers-list-item";

const FollowerList = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    let userFollowers = currentUser.FollowerList;

    
    useEffect(() => {
        dispatch(viewTopAgentThunk())}, [])

    return (
        <ul className="list-group mt-2">
            <li className="list-group-item">
                <h3>Followers</h3>
            </li>
            {
                userFollowers.map(follower =>
                  <FollowersListItem 
                  key={who.username}
                  who={who} />
                )
            }
        </ul>
    );
};
export default FollowerList;
