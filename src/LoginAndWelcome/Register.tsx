import axios from "axios";
import React, { useEffect, useState } from "react";

interface RegisterUser {
  user_name: string;
  user_email: string;
  user_password: string;
  confirm_password: string;
}

export default function Register() {
  const [RegisterUser, setRegisterUser] = useState<RegisterUser>({
    user_name: "",
    user_email: "",
    user_password: "",
    confirm_password: "",
  });
  const baseUserURL = "http://localhost:8080/users";
  const [disableRegister, setDisableRegister] = useState<boolean>();
  useEffect(() => {
    setDisableRegister(
      !RegisterUser.user_password ||
        !RegisterUser.confirm_password ||
        RegisterUser.user_password !== RegisterUser.confirm_password
    );
  }, [RegisterUser.user_password, RegisterUser.confirm_password]);

  const handleRegisterSubmit = async(e:React.FormEvent) => {
    e.preventDefault();

    try {
      const responseData = await axios.post(baseUserURL, RegisterUser, {
        headers: {
          "Content-Type":"application/json"
        }
      });
      if (responseData.status===200) {
        alert("register success");
      }
    } catch (error) {
      console.log("error to register User");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "22rem" }}>
        <div className="card-body">
          <h2 className="fw bold text-center mb-4">Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-3 ">
              <label>FullName</label>
              <input
                type="text"
                className="form-control"
                value={RegisterUser.user_name}
                onChange={(e) =>
                  setRegisterUser({
                    ...RegisterUser,
                    user_name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={RegisterUser.user_email}
                onChange={(e) =>
                  setRegisterUser({
                    ...RegisterUser,
                    user_email: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={RegisterUser.user_password}
                onChange={(e) =>
                  setRegisterUser({
                    ...RegisterUser,
                    user_password: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label>ConfirmPassword</label>
              <input
                type="password"
                className="form-control"
                value={RegisterUser.confirm_password}
                onChange={(e) =>
                  setRegisterUser({
                    ...RegisterUser,
                    confirm_password: e.target.value,
                  })
                }
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary "
                disabled={disableRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
