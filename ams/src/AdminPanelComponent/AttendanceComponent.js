import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './this.css';

const AttendanceComponent = () => {
  const [students, setStudents] = useState([]);
  const [batch, setBatch] = useState('');
  const [date, setDate] = useState('');
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await axios.get('http://localhost:5000/students');
      setStudents(result.data);
    };

    fetchStudents();
  }, []);

  const handleAttendance = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async () => {
    if (!batch || !date) {
      alert('Please select both batch and date.');
      return;
    }

    const attendanceData = Object.keys(attendance).map(studentId => ({
      studentId,
      status: attendance[studentId]
    }));

    const existingAttendance = await axios.get('http://localhost:5000/attendance');
    const updatedAttendance = {
      ...existingAttendance.data,
      [date]: {
        ...existingAttendance.data[date],
        [batch]: attendanceData
      }
    };

    await axios.put('http://localhost:5000/attendance', updatedAttendance);
    alert('Attendance submitted successfully!');
  };

  const filteredStudents = students.filter(student => student.batch === batch);

  return (
    <div className=''>
     <div className='flex bg-blue-400  items-center gap-7'>
     <h2 className='p-2  text-white text-[20px]'> Attendance</h2>
      <div className='w-auto'>
      <label className='text-white'>Batch: </label>
        <select value={batch} className='inline-block p-2 outlineRemove' onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select Batch</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <div>
        <label className='text-white'>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
     </div>
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
          {filteredStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.batch}</td>
              <td className='flex gap-5'>
                <button className='border border-red bg-red-500 p-1 rounded-md px-2 text-white' onClick={() => handleAttendance(student.id, 'Absent')}>Absent</button>
                <button className='border border-red bg-green-500 p-1 rounded-md px-2 text-white' onClick={() => handleAttendance(student.id, 'Present')}>Present</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table><br/>
      <button className='p-1 bg-green-500 rounded-sm text-white ' onClick={handleSubmit}>Submit Attendance</button>
      <br/>
    </div>


  );
};

export default AttendanceComponent;










































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceComponent = () => {
//   const [students, setStudents] = useState([]);
//   const [batch, setBatch] = useState('');
//   const [date, setDate] = useState('');
//   const [attendance, setAttendance] = useState({});
//   const [attendanceRecords, setAttendanceRecords] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const result = await axios.get('http://localhost:5000/students');
//         setStudents(result.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//         alert('Error fetching students. Please try again later.');
//       }
//     };

//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     const fetchAttendanceRecords = async () => {
//       try {
//         const result = await axios.get('http://localhost:5000/attendance');
//         setAttendanceRecords(result.data);
//       } catch (error) {
//         console.error('Error fetching attendance records:', error);
//         alert('Error fetching attendance records. Please try again later.');
//       }
//     };

//     fetchAttendanceRecords();
//   }, []);

//   const handleAttendance = (studentId, status) => {
//     setAttendance(prev => ({
//       ...prev,
//       [studentId]: status
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!batch || !date) {
//       alert('Please select both batch and date.');
//       return;
//     }

//     const newAttendanceRecord = {
//       date,
//       batch,
//       attendance: Object.keys(attendance).map(studentId => ({
//         studentId,
//         status: attendance[studentId]
//       }))
//     };

//     try {
//       await axios.post('http://localhost:5000/attendance', newAttendanceRecord);
//       alert('Attendance added successfully!');
//       setAttendance({}); 
//     } catch (error) {
//       console.error('Error adding attendance:', error);
//       alert('There was an error adding attendance. Please try again.');
//     }
//   };

//   const filteredStudents = students.filter(student => student.batch === batch);

//   return (
//     <div>
//       <h2>Manual Attendance</h2>
//       <div>
//         <label>Batch: </label>
//         <select value={batch} onChange={(e) => setBatch(e.target.value)}>
//           <option value="">Select Batch</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//         </select>
//       </div>
//       <div>
//         <label>Date: </label>
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Student ID</th>
//             <th>Name</th>
//             <th>Batch</th>
//             <th>Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.map(student => (
//             <tr key={student.id}>
//               <td>{student.id}</td>
//               <td>{student.name}</td>
//               <td>{student.batch}</td>
//               <td>
//                 <button onClick={() => handleAttendance(student.id, 'Present')}>Present</button>
//                 <button onClick={() => handleAttendance(student.id, 'Absent')}>Absent</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleSubmit}>Submit Attendance</button>
//     </div>
//   );
// };

// export default AttendanceComponent;