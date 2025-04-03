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
  const [userList, setUserList] = useState<User[]>();
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
          let data = responseData.data;
          setUserList(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [showModal]); //here as delete operation if done then we need updated list from db and that should be in table

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

  return (
    <>
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
            {userList &&
              userList.map((item) => (
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
                        disabled={item.userEmail === loggedIn ? true : false}
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
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
                  <p>Are you sure you want to delete</p>
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
      </div>
    </>
  );
};

export default ManageUsers;
