import React from 'react';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Welcome from './LoginAndWelcome/Welcome';
import Login from './LoginAndWelcome/Login';
import Register from './LoginAndWelcome/Register';
import Dashboard from './Dashboard/Dashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
