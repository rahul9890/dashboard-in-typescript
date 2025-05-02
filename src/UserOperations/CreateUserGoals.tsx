import axios from "axios";
import React, { useEffect, useState } from "react"; import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetUserGoals from "./GetUserGoals";

interface CreateGoals {
  userId: string
  goalTitle: string;
  goalType: string;
  goalDescription: string;
  goalPriority: string;
  dueDate: string;
}

const CreateUserGoals: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const baseURL = "http://localhost:8080/user/goals";
  const [showToast, setShowToast] = useState<boolean>(false);
  
  const [createGoalsForm, setCreateGoalsForm] = useState<CreateGoals>({
    userId: JSON.parse(sessionStorage.getItem("loggedInUser")).userId || "",
    goalTitle: "",
    goalType: "",
    goalDescription: "",
    goalPriority: "",
    dueDate: today,
  });

  useEffect(() => {
    if (showToast) {
      toast.success("Goal Created!");
      setShowToast(false); // Reset so it doesn't trigger repeatedly
    }
  }, [showToast]);

  const handleCreateGoals = async (e: React.FormEvent) => {
   
    try {
        console.log(createGoalsForm)
      const responseData = await axios.put(baseURL, createGoalsForm, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (responseData.status === 201) {
        setShowToast(true);

      }

    } catch (error) {
      console.log(error);
    }


  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center ">
      <div
        className="card shadow-lg p-4"
        style={{ width: "50rem", padding: "1rem" }}
      >
        <div>
          <h3 className="card-body text-center">Create Goal</h3>
          <form onSubmit={handleCreateGoals}>
            <label className="form-label fw-semibold ">Goal Title</label>
            <input
              type="text"
              className="form-control"
              value={createGoalsForm.goalTitle}
              placeholder="Enter Goal Title here"
              onChange={(e) =>
                setCreateGoalsForm({
                  ...createGoalsForm,
                  goalTitle: e.target.value,
                })
              }
            />

            <label className="form-label fw-semibold mt-3">Goal Type</label>
            <select
              className="form-control"
              value={createGoalsForm.goalType}
              onChange={(e) => {
                setCreateGoalsForm({
                  ...createGoalsForm,
                  goalType: e.target.value,
                });
              }}
            >
              <option value="">Select Goal Type</option>
              <option value="Personal">Personal</option>
              <option value="Corporate">Corporate</option>
              <option value="Skills">Skills</option>
              <option value="Family">Family</option>
            </select>
            <label className="form-label fw-semibold mt-3">
              Goal Description
            </label>
            <input
              type="text"
              className="form-control"
              value={createGoalsForm.goalDescription}
              onChange={(e) => {
                setCreateGoalsForm({
                  ...createGoalsForm,
                  goalDescription: e.target.value,
                });
              }}
            />
            <label className="form-label fw-semibold mt-3">Goal Priority</label>
            <div className="d-flex gap-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="goalPriority"
                  value="high"
                  checked={createGoalsForm.goalPriority === "high"}
                  onChange={(e) =>
                    setCreateGoalsForm({
                      ...createGoalsForm,
                      goalPriority: e.target.value,
                    })
                  }
                  id="priority-high"
                />
                <label className="form-check-label" htmlFor="priority-high">
                  High
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="goalPriority"
                  value="medium"
                  checked={createGoalsForm.goalPriority === "medium"}
                  onChange={(e) =>
                    setCreateGoalsForm({
                      ...createGoalsForm,
                      goalPriority: e.target.value,
                    })
                  }
                  id="priority-medium"
                />
                <label className="form-check-label" htmlFor="priority-medium">
                  Medium
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="goalPriority"
                  value="low"
                  checked={createGoalsForm.goalPriority === "low"}
                  onChange={(e) =>
                    setCreateGoalsForm({
                      ...createGoalsForm,
                      goalPriority: e.target.value,
                    })
                  }
                  id="priority-low"
                />
                <label className="form-check-label" htmlFor="priority-low">
                  Low
                </label>
              </div>
            </div>
            <label className="form-label fw-semibold mt-3">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={createGoalsForm.dueDate}
              onChange={(e) =>
                setCreateGoalsForm({
                  ...createGoalsForm,
                  dueDate: e.target.value,
                })
              }
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary m-2" type="submit">
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> <GetUserGoals/> <ToastContainer/></>
  );
};

export default CreateUserGoals;
