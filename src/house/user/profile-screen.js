import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import SavedHouseList from "../houses/savedHouseList";
import PostedHouseList from "../houses/PostedHouseList";

import {
  logoutThunk,
  updateUserThunk,
} from "../services/auth-thunks";
function ProfileScreen() {
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const save = async () => {await dispatch(updateUserThunk(profile));
  };
  return (
    <div>
      <h1>Profile Screen</h1>
      {profile && (
        <div>
          <div>
            <label for="firstname" className ="fs-5">First Name</label>
            <input
              type="text"
              id="firstname"
              className = "form-control"
              value={profile.first_name}
              onChange={(event) => {
                const newProfile = {
                  ...profile,
                  first_name: event.target.value,
                };
                setProfile(newProfile);
              }}
            />
          </div>
          <div>
            <label for="lastname" className ="fs-5">Last Name</label>
            <input
              type="text"
              id="lastname"
              className = "form-control"
              value={profile.last_name}
              onChange={(event) => {
                const newProfile = {
                  ...profile,
                  last_name: event.target.value,
                };
                setProfile(newProfile);
              }}
            />
          </div>
          <div>
            <label for="phone" className ="fs-5">Phone Number</label>
            <input
              type="text"
              id="phone"
              className = "form-control"
              value={profile.phone}
              onChange={(event) => {
                const newProfile = {
                  ...profile,
                  phone: event.target.value,
                };
                setProfile(newProfile);
              }}
            />
          </div>
          <div>
            <label for="email" className ="fs-5 col">Email</label>
            <input
              className = "form-control"
              id="email"
              type="text"
              value={profile.email}
              onChange={(event) => {
                const newProfile = {
                  ...profile,
                  email: event.target.value,
                };
                setProfile(newProfile);
              }}
            /> 
          </div>
          <div>
            <label className ="fs-5">Role</label>
            <span className = "text-primary font-italic form-control bg-light-grey">{" " + profile.role}</span>
          </div>
          {profile.role === "seller" && <SavedHouseList />}
          {profile.role === "buyer" && <SavedHouseList />}
          {profile.role === "agent" && <PostedHouseList />}
        </div>
      )}
        <button className="btn btn-primary m-2"
          onClick={async() => {
            await dispatch(logoutThunk());
            navigate("/house/login");
        }}>{" "}Logout</button>
      <button onClick={save} className="btn btn-primary m-2">Save </button>
     

    </div>
    
  ); 
}
export default ProfileScreen;
