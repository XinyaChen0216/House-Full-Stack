import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginThunk } from "../services/auth-thunks";
import AgentPublicInfo from "./agent-public";
import BuyerSellerPublicInfo from "./buyer-seller-public";
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
      //add current user to requested User's following list
      let currFollowing = [...currentUser.following];
      // const followIdx = currFollowing.findIndex((curr) => curr === requestedUser._id);
      // if (followIdx >= 0) {
      //   currFollowing.splice(followIdx, 1);
      // } else {
        currFollowing.push(requestedUser._id);
      // }
      //console.log(currFollowing);
      let newFollowing = {
        ...currentUser,
        following: [...currFollowing],
      };
      console.log("we need to add this to the current user's following array");
      console.log(currFollowing);
      let reqFollowers = [...requestedUser.followers];
      const followerIdx = reqFollowers.findIndex((curr) => curr === currentUser._id);
      if (followerIdx >= 0) {
        reqFollowers.splice(followerIdx, 1);
      } else {
        reqFollowers.push(currentUser._id);
      }
      
      let newFollowers = {
        ...requestedUser,
        followers: [...reqFollowers],
      };
      
      console.log("we need to add this to requested users' followers array")
      console.log(reqFollowers);
      await dispatch(updateUserThunk(newFollowers));
      await dispatch(updateUserThunk(newFollowing));

      
    } else {
      await dispatch(loginThunk());
      navigate("/house/login")
    }
  }

  const unFollowUserHandler = async () => {
    if (currentUser && requestedUser){
      let currFollowing = [...currentUser.following];
      currFollowing.pop(requestedUser._id);
      let newFollowing = {
        ...currentUser,
        following: [...currFollowing],
      };

      let reqFollowers = [...requestedUser.followers];
      reqFollowers.pop(currentUser._id);
      let newFollowers = {
        ...requestedUser,
        followers: [...reqFollowers],
      };

      console.log(reqFollowers);

      await dispatch(updateUserThunk(newFollowers));
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
        onClick={(event) => 
          followUserHandler(event)
        }>Follow</button>))}

      {( currentUser.following.includes(requestedUser._id) && ( <button className="btn btn-primary mt-2"
        onClick={(event) => 
          unFollowUserHandler(event)
        }>Unfollow</button>))}
     
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
