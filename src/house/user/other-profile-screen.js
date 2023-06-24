import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginThunk } from "../services/auth-thunks";
import AgentPublicInfo from "./agent-public";
import BuyerSellerPublicInfo from "./buyer-seller-public";
import ProfileScreen from "./profile-screen";
import { updateUserThunk } from "../services/auth-thunks";

function OtherProfileScreen() {
  const { currentUser, requestedUser } = useSelector((state) => state.user);
  const [reqProfile, setReqProfile] = useState(requestedUser);
  const [currentProfile, setCurrProfile] = useState(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const followUserHandler = async (event) => {
    if (currentUser && requestedUser){
      let currFollowing = [...currentUser.following];
      const followIdx = currFollowing.findIndex((curr) => curr === requestedUser._id);
      if (followIdx >= 0) {
        currFollowing.splice(followIdx, 1);
      } else {
        currFollowing.push(requestedUser._id);
      }
      console.log(currFollowing);
      let newFollowing = {
        ...currentUser,
        following: [...currFollowing],
      };
      await dispatch(updateUserThunk(newFollowing));
    } else {
      await dispatch(loginThunk());
      navigate("/house/login")
    }
  }

  
  
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
        onClick={(event) => {
          followUserHandler(event);
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
