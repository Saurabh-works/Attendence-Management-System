import React, { useState } from 'react';
import axios from 'axios';

const ShowBatchAttendance = () => {
  const [batch, setBatch] = useState('');
  const [date, setDate] = useState('');
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [error, setError] = useState('');

  const handleFetchAttendance = async () => {
    if (!batch || !date) {
      setError('Please select both batch and date.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/attendance`);
      const attendanceData = response.data;

      if (attendanceData[date] && attendanceData[date][batch]) {
        const batchAttendance = attendanceData[date][batch];

        const studentResponse = await axios.get(`http://localhost:5000/students`);
        const students = studentResponse.data;

        const attendanceWithDetails = batchAttendance.map(att => {
          const student = students.find(s => s.id === att.studentId);
          return {
            ...student,
            status: att.status,
          };
        });

        setAttendanceDetails(attendanceWithDetails);
        setError('');
      } else {
        setError('No attendance records found for the given date and batch.');
        setAttendanceDetails([]);
      }
    } catch (error) {
      console.error('Error fetching attendance details:', error);
      setError('Error fetching attendance details. Please try again.');
      setAttendanceDetails([]);
    }
  };

  return (
    <div>
      <h2>Show Batch Attendance</h2>
      <div>
        <label>Batch: </label>
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select Batch</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <div>
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button onClick={handleFetchAttendance}>Fetch Attendance</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {attendanceDetails.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceDetails.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.batch}</td>
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowBatchAttendance;
