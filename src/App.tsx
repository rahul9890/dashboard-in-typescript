import React from 'react';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Welcome from './LoginAndWelcome/Welcome';
import Login from './LoginAndWelcome/Login';
import Register from './LoginAndWelcome/Register';
import Dashboard from './Dashboard/Dashboard';
import ManageUsers from './Dashboard/ManageUsers';
import ManageDocument from './Dashboard/ManageDocument';
import Groupchat from './Dashboard/Groupchat';
import Navbar from './Navbar/Navbar';
import EditUser from './Dashboard/EditUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Navbar />}>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/groupchat" element={<Groupchat />}/>
            <Route path="/manageusers" element={<ManageUsers />}/>
            <Route path="/ManageDocuments" element={<ManageDocument />} />
            <Route path='/edituser' element={ <EditUser/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
