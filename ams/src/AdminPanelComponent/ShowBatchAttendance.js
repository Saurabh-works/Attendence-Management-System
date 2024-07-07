import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from "react-to-print"; 
import BatchReport from '../Report/BatchReport';
import { Link, Route} from "react-router-dom";

const ShowBatchAttendance = () => {
  const componentPDF = useRef();
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

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle:"StudentDataTable",
    onAfterPrint: ()=> alert("Data saved in PDF")

  });

  return (
    <>
    <div>
      <h2>Show Batch Attendance</h2>
      <div ref={componentPDF} >
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
    </div>

 <div>
         <button className="btn btn-success" onClick={ generatePDF }>Save as PDF</button>
      </div> 

      <div>
        {/* <Link to="/BatchReport">Batch Report</Link> */}
        <BatchReport>BatchReport</BatchReport>
      </div>
      </>

  );
};

export default ShowBatchAttendance;
