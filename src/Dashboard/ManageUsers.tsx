import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  userId: number;
  userName: string;
  userEmail: string;
  userPassword: string;
}

const ManageUsers: React.FC = () => {
  const [userList, setUserList] = useState<User[]>();
  const baseUserURL = "http://localhost:8080/users";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(baseUserURL);
        if (responseData.status === 200) {
          let data = responseData.data;
          setUserList(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="m-4">
      <h2>Users</h2>
      <table className="table table-info table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.map((item) => (
            <tr key={item.userId}>
              <td>{item.userName}</td>
              <td>{item.userEmail}</td>
              <td>
                <span>
                  <button className="btn btn-primary m-1">Edit</button>
                </span>
                <span>
                  <button className="btn btn-primary">Delete</button>
                </span>
              </td>
            </tr>
          ))}
         </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
