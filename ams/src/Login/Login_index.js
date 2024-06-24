import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import AdminPanel_index from '../AdminPanelComponent/AdminPanel_index';
import StudentPanel_index from '../StudentPanelComponent/StudentPanel_index';

function Login_index() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPanel_index />} />
        <Route path="/student" element={<StudentPanel_index />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default Login_index;
