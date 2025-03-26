import React from "react"
import { useSelector } from "react-redux";

const Dashboard: React.FC = () => {

    let loggedIn = useSelector((state: any) => state.auth.loggedInUserEmail)
    if (!loggedIn) {
        loggedIn = sessionStorage.getItem("loggedInUserEmail");
    }

    return (
      <div>
        <h2 className="m-3 text-center">Login Successful</h2>
        <div className="text-center">
          <span className="fw-bold">Welcome !</span> {loggedIn}
        </div>
      </div>
    );
}

export default Dashboard;