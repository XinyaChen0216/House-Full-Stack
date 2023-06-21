import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  logoutThunk,
  updateUserThunk,
} from "../services/auth-thunks";
function OtherProfileScreen() {
  const { requestedUser } = useSelector((state) => state.user);
  //const { currentUser } = useSelector((state) => state.currentUser);
  const [profile, setProfile] = useState(requestedUser);

  //console.log(currentUser);
  console.log(requestedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Profile Screen</h1>
      {profile && (
        <div>
          <div>
            <label for="firstname" className ="fs-5">First Name</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + profile.firstName}</span>
          </div>
          <div>
            <label for="lastname" className ="fs-5">Last Name</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + profile.lastName}</span>
          </div>
          <div>
            <label for="phone" className ="fs-5">Phone Number</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + profile.phone}</span>
          </div>
          <div>
            <label for="email" className ="fs-5 col">Email</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + profile.email}</span> 
          </div>
          <div>
            <label className ="fs-5">Role</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + profile.role}</span>
          </div>
        </div>
      )}
      <button className="btn btn-primary m-2"
        onClick={async() => {
          navigate("/house/home");
        }}>Finish</button>
    </div>
  ); 
}
export default OtherProfileScreen;
