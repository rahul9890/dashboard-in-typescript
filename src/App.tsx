import React from 'react';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Welcome from './LoginAndWelcome/Welcome';
import Login from './LoginAndWelcome/Login';
import Register from './LoginAndWelcome/Register';
import Dashboard from './Dashboard/Dashboard';
import ManageUsers from './Dashboard/ManageUsers';
import ManageDocument from './Dashboard/ManageDocument';
import PracticeGround from './Dashboard/PracticeGround';
import Navbar from './Navbar/Navbar';
import EditUser from './Dashboard/EditUser';
import CreateUserGoals from './UserOperations/CreateUserGoals';
import GetUserGoals from './UserOperations/GetUserGoals';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Navbar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/practiceGround" element={<PracticeGround />} />
            <Route path="/manageusers" element={<ManageUsers />} />
            <Route path="/ManageDocuments" element={<ManageDocument />} />
            <Route path='/getUserGoals' element={<GetUserGoals/>}/>
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/createusergoals" element={<CreateUserGoals />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
