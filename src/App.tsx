import React from 'react';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Welcome from './LoginAndWelcome/Welcome';
import Login from './LoginAndWelcome/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
