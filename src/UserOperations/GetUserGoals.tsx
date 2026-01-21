import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Goal {
  goalId: number;
  goalTitle: string;
  goalType: string;
  goalDescription: string;
  goalPriority: string;
  goalComments: string;
  dueDate: string;
}

const GetUserGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
  const [editedGoal, setEditedGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get<Goal[]>(
          'http://localhost:8080/user/goals?userId=0e6c5a64-d9a0-40de-ae0c-9432b79f79b3'
        );
        setGoals(response.data);
      } catch (err) {
        setError('Failed to fetch user goals.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleEditClick = (goal: Goal) => {
    setEditingGoalId(goal.goalId);
    setEditedGoal({ ...goal });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedGoal) return;

    setEditedGoal({
      ...editedGoal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!editedGoal) return;

    try {
      await axios.put(
        `http://localhost:8080/user/goals/update/${editedGoal.goalId}`,
        editedGoal
      );

      setGoals((prev) =>
        prev.map((g) =>
          g.goalId === editedGoal.goalId ? editedGoal : g
        )
      );

      setEditingGoalId(null);
      setEditedGoal(null);
    } catch (error) {
      alert('Failed to update goal');
    }
  };

  const handleCancel = () => {
    setEditingGoalId(null);
    setEditedGoal(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User Goals</h1>
      <table className="table table-info table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {goals.map((goal) => {
            const isEditing = editingGoalId === goal.goalId;

            return (
              <tr key={goal.goalId}>
                <td>
                  {isEditing ? (
                    <input
                      name="goalTitle"
                      value={editedGoal?.goalTitle || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    goal.goalTitle
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name="goalType"
                      value={editedGoal?.goalType || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    goal.goalType
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name="goalDescription"
                      value={editedGoal?.goalDescription || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    goal.goalDescription
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name="goalPriority"
                      value={editedGoal?.goalPriority || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    goal.goalPriority
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name="goalComments"
                      value={editedGoal?.goalComments || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    goal.goalComments
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dueDate"
                      value={editedGoal?.dueDate || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    goal.dueDate
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditClick(goal)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GetUserGoals;
