import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard: React.FC = () => {

  const location = useLocation();
  const [showToast, setShowToast] = useState<boolean>(false);

useEffect(() => {
  if (location.state?.toastMessage) {
    toast.success(location.state.toastMessage);
    // Clear history state so it doesn't repeat on reload
    window.history.replaceState({}, document.title);
  }
}, [location]);



    let loggedIn = useSelector((state: any) => state.auth.loggedInUserEmail)
    if (!loggedIn) {
        loggedIn = sessionStorage.getItem("loggedInUserEmail");
    }

  return (
    <>
      <div>
        <h2 className="m-3 text-center">Login Successful</h2>
        <div className="text-center">
          <span className="fw-bold">Welcome !</span> {loggedIn}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Dashboard;