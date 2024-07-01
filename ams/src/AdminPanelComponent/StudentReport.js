import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentReport = () => {
  const [batch, setBatch] = useState('');
  const [studentId, setStudentId] = useState('');
  const [month, setMonth] = useState('');
  const [student, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState({ present: 0, absent: 0 });
  const [errorMessage, setErrorMessage] = useState('');

  const fetchStudent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/students/${id}`);
      const studentData = response.data;
      if (studentData.batch !== batch) {
        setErrorMessage('Student does not belong to the specified batch.');
        setStudent(null);
      } else {
        setStudent(studentData);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      setErrorMessage('Error fetching student data.');
      setStudent(null);
    }
  };

  const fetchAttendance = async (batch, id, month) => {
    try {
      const response = await axios.get('http://localhost:5000/attendance');
      const attendance = response.data;
      const filteredAttendance = [];

      let presentCount = 0;
      let absentCount = 0;

      for (const date in attendance) {
        if (date.startsWith(month)) {
          if (attendance[date][batch]) {
            const studentAttendance = attendance[date][batch].find(att => att.studentId === id);
            if (studentAttendance) {
              filteredAttendance.push({ date, status: studentAttendance.status });
              if (studentAttendance.status === 'Present') presentCount++;
              if (studentAttendance.status === 'Absent') absentCount++;
            }
          }
        }
      }

      setAttendanceData(filteredAttendance);
      setTotalAttendance({ present: presentCount, absent: absentCount });
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleSubmit = async () => {
    if (!batch || !studentId || !month) {
      alert('Please enter batch, student ID, and month.');
      return;
    }

    await fetchStudent(studentId);
    if (student) {
      await fetchAttendance(batch, studentId, month);
    }
  };

  return (
    <div>
      <h2>Student Monthly Attendance Report</h2>
      <div>
        <label>Batch: </label>
        <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} />
      </div>
      <div>
        <label>Student ID: </label>
        <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      </div>
      <div>
        <label>Month (YYYY-MM): </label>
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Generate Report</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {student && (
        <div>
          <h3>Student Details</h3>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Batch: {student.batch}</p>

          <h3>Attendance Report for {month}</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Attendance</h3>
          <p>Present: {totalAttendance.present}</p>
          <p>Absent: {totalAttendance.absent}</p>
        </div>
      )}
    </div>
  );
};

export default StudentReport;
