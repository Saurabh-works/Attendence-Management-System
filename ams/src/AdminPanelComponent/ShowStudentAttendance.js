import React, { useState } from 'react';
import axios from 'axios';

const ShowStudentAttendance = () => {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const [error, setError] = useState(''); 

  const handleFetchAttendance = async () => {
    if (!studentId || !date) {
      setError('Please enter both student ID and date.');
      return;
    }

    try {
      const studentsResponse = await axios.get(`http://localhost:5000/students/${studentId}`);
      const student = studentsResponse.data;

      const attendanceResponse = await axios.get(`http://localhost:5000/attendance`);
      const attendanceData = attendanceResponse.data;

      if (attendanceData[date] && attendanceData[date][student.batch]) {
        const attendanceRecord = attendanceData[date][student.batch].find(att => att.studentId === studentId);

        setAttendanceDetails({
          ...student,
          status: attendanceRecord ? attendanceRecord.status : 'Absent',
        });
        setError('');
      } else {
        setError('No attendance record found for the given date and student batch.');
        setAttendanceDetails(null);
      }
    } catch (error) {
      console.error('Error fetching attendance details:', error);
      setError('Error fetching attendance details. Please try again.');
      setAttendanceDetails(null);
    }
  };

  return (
    <div>
      <h2>Show Student Attendance</h2>
      <div>
        <label>Student ID: </label>
        <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      </div>
      <div>
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button onClick={handleFetchAttendance}>Fetch Attendance</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {attendanceDetails && (
        <div>
          <h3>Attendance Details</h3>
          <p>Student ID: {attendanceDetails.id}</p>
          <p>Name: {attendanceDetails.name}</p>
          <p>Batch: {attendanceDetails.batch}</p>
          <p>Attendance Status: {attendanceDetails.status}</p>
        </div>
      )}
    </div>
  );
};

export default ShowStudentAttendance;
