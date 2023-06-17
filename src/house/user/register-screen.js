import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../services/auth-thunks";
import { getRoles } from "@testing-library/react";
function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = async () => {
        try {
            await dispatch(registerThunk({ username, password, email, role }));
            navigate("/tuiter/profile");
        } catch (e) {
            alert(e);
        }
    };
    return (<div>
        <h1>Register Screen</h1>
        <div className="mt-2">
            <label>Username</label>
            <input className="form-control" type="text" value={username} placeholder="Please enter your username"
                onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="mt-2">
            <label>Password</label>
            <input className="form-control" type="password" value={password} placeholder="Please enter your password"
                onChange={(event) => setPassword(event.target.value)} />
        </div>

        <div className="mt-2">
            <label>Email</label>
            <input className="form-control" type="email" value={email} placeholder="Please enter your email"
                onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div>
            <p>Please choose your role</p>
            <div>
                <div>
                    <input type="radio" id="buyer" name="role" value={role} onChange={(event) => setRole(event.target.value)} />
                    <label for="buyer">Buyer</label>
                </div>
                <div>
                    <input type="radio" id="seller" name="role" value={role} onChange={(event) => setRole(event.target.value)} />
                    <label for="seller">Seller</label>
                </div>
                <input type="radio" id="agent" name="role" checked value={role} onChange={(event) => setRole(event.target.value)} />
                <label for="agent">Agent</label>
            </div>
        </div>


        <button className="btn btn-primary mt-2"
            onClick={handleRegister}>
            Register
        </button>
    </div>
    );
}
export default RegisterScreen;