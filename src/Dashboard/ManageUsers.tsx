import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface User {
  userId: number;
  userName: string;
  userEmail: string;
  userPassword: string;
}

const ManageUsers: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // 🔹 Add search state
  const baseUserURL = "http://localhost:8080/users";
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userEmailForDelete, setUserEmailForDelete] = useState<string>();

  let loggedIn = useSelector((state: any) => state.auth.loggedInUserEmail);
  if (!loggedIn) {
    loggedIn = sessionStorage.getItem("loggedInUserEmail");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(baseUserURL);
        if (responseData.status === 200) {
          setUserList(responseData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [showModal]); // 🔹 Refresh the list after deletion

  const handleDelete = () => {
    const deleteUser = async () => {
      try {
        const responseData = await axios.delete(baseUserURL, {
          data: { userEmail: userEmailForDelete },
        });
        if (responseData.status === 200) {
          setShowModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    deleteUser();
  };

  // 🔹 Filter users based on search term
  //here at start as search term is empty so all userList is returned as filterdUserList 
  const filteredUsers = userList.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="m-4">
        <h2>Users</h2>

        {/* 🔹 Search Input */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="table table-info table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item) => (
                <tr key={item.userId}>
                  <td>{item.userName}</td>
                  <td>{item.userEmail}</td>
                  <td>
                    <span>
                      <button
                        className="btn btn-primary m-1"
                        onClick={() =>
                          navigate("/edituser", { state: { user: item } })
                        }
                      >
                        Edit
                      </button>
                    </span>
                    <span>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setUserEmailForDelete(item.userEmail);
                          setShowModal(true);
                        }}
                        disabled={item.userEmail === loggedIn}
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-danger">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Delete Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
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

export default ManageUsers;
