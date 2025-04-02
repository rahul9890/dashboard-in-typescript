import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

export default function EditUser() {
  const [updatedUser, setUpdatedUser] = useState({
    userId: 0,
    userName: "",
    userEmail: "",
  }); // State to control toast visibility

  const location = useLocation();
  const baseUserURL = "http://localhost:8080/users";
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state?.user) {
      setUpdatedUser(location.state.user);
    }
  }, [location.state]);
  const handleSave = async () => {
    try {
      const responeData = await axios.put(baseUserURL, updatedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (responeData.status === 200) {
        navigate("/manageusers"); // Redirect to user list page
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <h2>Edit Users Information</h2>
        <label>Full Name:</label>
        <input
          type="text"
          value={updatedUser.userName} // <-- Bind value to state
          onChange={(e) => {
            setUpdatedUser((prev) => ({
              ...prev,
              userName: e.target.value, // <-- Update only the "name" field
            }));
          }}
        />

        <label>Email:</label>
        <input
          type="email"
          value={updatedUser.userEmail}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, userEmail: e.target.value })
          }
        />
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
