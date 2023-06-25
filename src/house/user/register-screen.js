import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../services/auth-thunks";

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
            navigate("/house/profile");
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
            <p className="mt-3 mb-1">Please choose your role</p>
            <div>
                <div>
                    <input type="radio" id="buyer" name="role" value="buyer" onClick={(event) => setRole(event.target.value)} />
                    <label for="buyer" className="mb-2">Buyer</label>
                </div>
                <div>
                    <input type="radio" id="seller" name="role" value="seller" onClick={(event) => setRole(event.target.value)} />
                    <label for="seller" className="mb-2">Seller</label>
                </div>
                <div>
                    <input type="radio" id="agent" name="role" value="agent" onClick={(event) => setRole(event.target.value)} />
                    <label for="agent" className="mb-2">Agent</label>
                </div>
                <div>
                    <input type="radio" id="admin" name="role" value="admin" onClick={(event) => setRole(event.target.value)} />
                    <label for="admin" className="mb-2">Admin</label>
                </div>
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