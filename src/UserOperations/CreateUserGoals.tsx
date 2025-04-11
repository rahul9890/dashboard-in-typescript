import React, { useState } from "react";

interface CreateGoals {
  goalTitle: string;
  goalType: string;
  goalDescription: string;
  goalPriority: string;
  dueDate: string;
}

const CreateUserGoals: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [createGoalsForm, setCreateGoalsForm] = useState<CreateGoals>({
    goalTitle: "",
    goalType: "",
    goalDescription: "",
    goalPriority: "",
    dueDate: today,
  });

  return (
    <div className="d-flex justify-content-center align-items-center " >
      <div className="card shadow-lg p-4" style={{ width: "50rem", padding: "1rem"  }}>
        <div>
          <h3 className="card-body text-center">Create Goal</h3>
          <form>
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
              <option value="personal">Personal</option>
              <option value="corporate">Corporate</option>
              <option value="skills">Skills</option>
              <option value="family">Family</option>
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
              <button className="btn btn-primary m-2">Create Goal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserGoals;
