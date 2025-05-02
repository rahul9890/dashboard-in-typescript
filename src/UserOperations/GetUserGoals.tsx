import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Goal {
    goalId: number;
    goalTitle: string;
    goalType: string;
    goalDescription: string;
    goalPriority: string;
    dueDate: string;
}

const GetUserGoals: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get<Goal[]>('http://localhost:8080/user/goals?userId=0e6c5a64-d9a0-40de-ae0c-9432b79f79b3');
                setGoals(response.data);
                console.log('Goals' + goals);
                console.log('Response' + JSON.stringify(response.data));
            } catch (err) {
                setError('Failed to fetch user goals.');
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, []);

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
                        <th>goalPriority</th>
                        <th>dueDate</th>

                    </tr>
                </thead>
                <tbody>
                    {goals.map((goal) => (
                        <tr key={goal.goalId}>
                            <td>{goal.goalTitle}</td>
                            <td>{goal.goalType}</td>
                            <td>{goal.goalDescription}</td>
                            <td>{goal.goalPriority}</td>
                            <td>{goal.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetUserGoals;