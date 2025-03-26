import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {

    const navigate = useNavigate();

    return (
        <div className="position-absolute top-30 start-50 translate-middle-x mt-5">
            <div className="text-center">
                <h2>Welcoome to Users Module</h2>
            
            <div className="mb-3">
                <label className="d-block mb-2 fw-bold">Existing Users</label>
                <button onClick={()=>navigate("/login")}>Login</button>
            </div>
            <div className="mb-3">
                <label className="d-block mb-2 fw-bold">New Users</label>
                <button onClick={()=>navigate("/register")}>Register</button>
                </div></div>
      </div>

    );
}
