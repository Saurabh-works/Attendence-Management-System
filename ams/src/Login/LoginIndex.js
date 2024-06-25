import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import AdminPanelIndex from '../AdminPanelComponent/AdminPanelIndex';
import StudentPanelIndex from '../StudentPanelComponent/StudentPanelIndex';

function LoginIndex() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPanelIndex />} />
        <Route path="/student" element={<StudentPanelIndex />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default LoginIndex;
