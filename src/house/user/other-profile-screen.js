import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import AgentPublicInfo from "./agent-public";
import BuyerSellerPublicInfo from "./buyer-seller-public";
import ProfileScreen from "./profile-screen";

function OtherProfileScreen() {
  const { currentUser, requestedUser } = useSelector((state) => state.user);
  const [reqProfile, setReqProfile] = useState(requestedUser);
  const [currentProfile, setCurrProfile] = useState(currentUser);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    setReqProfile(requestedUser)
  }, [requestedUser])
   
  
  return (
    <div>
      <h1> {reqProfile.first_name}'s Profile</h1>
      
      {reqProfile.role === "agent" && AgentPublicInfo(reqProfile)}
      {reqProfile.role === "buyer" && BuyerSellerPublicInfo(reqProfile)}
      {reqProfile.role === "seller" && BuyerSellerPublicInfo(reqProfile)}
      
      <div >
      <button className="btn btn-primary mt-2"
        onClick={async() => {
          navigate("/house/home");
        }}>Follow</button>
      <span> </span>
      <button className="btn btn-primary mt-2"
        onClick={async() => {
          navigate("/house/home");
        }}>Finish</button>
      </div>
    </div>
  ); 

}
export default OtherProfileScreen;
