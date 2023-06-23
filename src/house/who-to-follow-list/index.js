import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewTopAgentThunk } from "../services/auth-thunks";
import WhoToFollowListItem from "./who-to-follow-list-item";

const WhoToFollowList = () => {
    const dispatch = useDispatch();
    const { agent } = useSelector((state) => state.who);
    
    useEffect(() => {
        dispatch(viewTopAgentThunk())}, [])

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <h3>Top 3 Agents</h3>
            </li>
            {
                agent.map(who =>
                  <WhoToFollowListItem 
                  key={who.username}
                  who={who} />
                )
            }
        </ul>
    );
};
export default WhoToFollowList;
