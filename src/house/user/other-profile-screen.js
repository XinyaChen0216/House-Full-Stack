import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import AgentPublicInfo from "./agent-public";
import BuyerSellerPublicInfo from "./buyer-seller-public";

function OtherProfileScreen() {
  const { currentUser, requestedUser } = useSelector((state) => state.user);
  //const { currentUser } = useSelector((state) => state.currentUser);
  const [reqProfile, setReqProfile] = useState(requestedUser);
  //const [currentProfile, setCurrProfile] = useState(currentUser);

  console.log(currentUser);
  console.log(requestedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    
    <div>
      <h1>Profile Screen</h1>
      {requestedUser['role'] === "agent" && AgentPublicInfo(reqProfile)}
      {requestedUser['role'] === "buyer" && BuyerSellerPublicInfo(reqProfile)}
      {requestedUser['role'] === "seller" && BuyerSellerPublicInfo(reqProfile)}
      
      <button className="btn btn-primary mr-2"
        onClick={async() => {
          navigate("/house/home");
        }}>Finish</button>
    </div>
  ); 
}
export default OtherProfileScreen;
