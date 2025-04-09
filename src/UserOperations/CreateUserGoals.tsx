import React, { useState } from "react";

interface CreateGoals {
  goalTitle: string;
  goalType: string;
  goalDescription: string;
  goalPriority: string;
  dueDate: Date;
}

const CreateUserGoals: React.FC = () => {
   



  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "50rem" }}>
        <div className="card-body text-center">
          <h2>Create Goal</h2>
          <form>
          
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserGoals;
