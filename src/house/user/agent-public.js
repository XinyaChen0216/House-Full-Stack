import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function AgentPublicInfo(reqProfile) {
  
  return (
        <div>
          <div>
            <label for="firstname" className ="fs-5">First Name</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + reqProfile.firstName}</span>
          </div>
          <div>
            <label for="lastname" className ="fs-5">Last Name</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + reqProfile.lastName}</span>
          </div>
          <div>
            <label for="phone" className ="fs-5">Phone Number</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + reqProfile.phone}</span>
          </div>
          <div>
            <label for="email" className ="fs-5 col">Email</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + reqProfile.email}</span> 
          </div>
          <div>
            <label className ="fs-5">Role</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + reqProfile.role}</span>
          </div>
        </div>
      )}
export default AgentPublicInfo;
