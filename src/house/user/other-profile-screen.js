import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginThunk } from "../services/auth-thunks";
import AgentPublicInfo from "./agent-public";
import BuyerSellerPublicInfo from "./buyer-seller-public";
import ProfileScreen from "./profile-screen";
import { updateUserThunk } from "../services/auth-thunks";
import {RiUserFollowFill} from "react-icons/ri";

function OtherProfileScreen() {
  const { currentUser, requestedUser } = useSelector((state) => state.user);
  const [reqProfile, setReqProfile] = useState(requestedUser);
  const [currentProfile, setCurrProfile] = useState(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const followUserHandler = async () => {
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
      
      let reqFollowers = requestedUser.followers;
      reqFollowers = reqFollowers + 1;
      let updatedReqFollowers = {
        ...requestedUser,
        followers: reqFollowers,
      };
      await dispatch(updateUserThunk(updatedReqFollowers));
      console.log(requestedUser.followers)
      await dispatch(updateUserThunk(newFollowing));
      
    } else {
      await dispatch(loginThunk());
      navigate("/house/login")
    }
  }

  const unFollowUserHandler = async () => {
    if (currentUser && requestedUser){
      let currFollowing = [...currentUser.following];
      //const followIdx = currFollowing.findIndex((curr) => curr === requestedUser._id);
      // if (followIdx >= 0) {
      //   currFollowing.splice(followIdx, 1);
      // } else {
      currFollowing.pop(requestedUser._id);
      // }
      let newFollowing = {
        ...currentUser,
        following: [...currFollowing],
      };
      let reqFollowers = requestedUser.followers;
      reqFollowers = reqFollowers - 1;
      console.log(reqFollowers);
      let updatedReqFollowers = {
        ...requestedUser,
        followers: reqFollowers,
      };
      await dispatch(updateUserThunk(updatedReqFollowers));
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
      <div>
      <h1> {reqProfile.first_name}'s Profile</h1>
      {( currentUser.following.includes(requestedUser._id) && (<RiUserFollowFill className = "text-primary"/>))}
      </div>
      <div>
      {reqProfile.role === "agent" && AgentPublicInfo(reqProfile)}
      {reqProfile.role === "buyer" && BuyerSellerPublicInfo(reqProfile)}
      {reqProfile.role === "seller" && BuyerSellerPublicInfo(reqProfile)}
      </div>
      <div>
      {( !currentUser.following.includes(requestedUser._id) && ( <button className="btn btn-primary mt-2"
        onClick={(event) => {
          followUserHandler(event);
        }}>Follow</button>))}

      {( currentUser.following.includes(requestedUser._id) && ( <button className="btn btn-primary mt-2"
        onClick={(event) => {
          unFollowUserHandler(event);
        }}>Unfollow</button>))}
     
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
