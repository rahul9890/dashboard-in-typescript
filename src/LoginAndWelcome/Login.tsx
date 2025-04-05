import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedIn } from "src/redux/authSlice";

interface LoggedInUser {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    email: "",
    password: "",
  });

  const baseUserURL = "http://localhost:8080/users";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isUserAuthenticate = await axios.post(
        baseUserURL + "/authentication",
        loggedInUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (isUserAuthenticate.data) {
        dispatch(loggedIn(loggedInUser.email));
        navigate("/dashboard",{state:{toastMessage: "Logged In successfully"}});
      } else {
        setShowModal(true);
      }
    } catch (error) {
      alert("Some error occurred");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4" style={{ width: "22rem" }}>
          <div className="card-body text-center">
            <h2 className="fw-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={loggedInUser.email}
                  onChange={(e) =>
                    setLoggedInUser({ ...loggedInUser, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={loggedInUser.password}
                  onChange={(e) =>
                    setLoggedInUser({
                      ...loggedInUser,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Failed</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Invalid email or password. Please try again.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
