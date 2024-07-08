import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const AttendanceComponent = () => {
  const [students, setStudents] = useState([]);
  const [batch, setBatch] = useState("");
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await axios.get("http://localhost:5000/students");
      setStudents(result.data);
    };

    fetchStudents();
  }, []);

  const handleAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    if (!batch || !date) {
      alert("Please select both batch and date.");
      return;
    }

    const attendanceData = Object.keys(attendance).map((studentId) => ({
      studentId,
      status: attendance[studentId],
    }));

    const existingAttendance = await axios.get(
      "http://localhost:5000/attendance"
    );
    const updatedAttendance = {
      ...existingAttendance.data,
      [date]: {
        ...existingAttendance.data[date],
        [batch]: attendanceData,
      },
    };

    await axios.put("http://localhost:5000/attendance", updatedAttendance);
    alert("Attendance submitted successfully!");
  };

  const filteredStudents = students.filter(
    (student) => student.batch === batch
  );

  return (
    <>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box component="div" sx={{ mt: 3 }}>

          {/* main form */}
          <Grid container spacing={2}>

            {/* select batch */}
            <Grid item md={6} lg={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Batch</InputLabel>
                <Select
                  label="Select Batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  required
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* select date */}
            <Grid item md={6} lg={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
            </Grid>

            {/* main table */}
            <Grid item md={12} lg={12} xs={12}>
              <TableContainer component={"paper"} sx={{ textAlign: "center" }}>
                <Table
                  sx={{ textAlign: "center" }}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <b>ID</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Name</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Batch</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Remark</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell align="center">{student.id}</TableCell>
                        <TableCell align="center">{student.name}</TableCell>
                        <TableCell align="center">{student.batch}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ me: 3, fontSize: { xs: "8px", md: "" } }}
                            onClick={() =>
                              handleAttendance(student.id, "Present")
                            }
                          >
                            Present
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            sx={{
                              marginLeft: { xs: "0", md: "10px" },
                              fontSize: { xs: "8px", md: "" },
                            }}
                            onClick={() =>
                              handleAttendance(student.id, "Absent")
                            }
                          >
                            Absent
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* submit attendence button */}
            <Grid item md={12} lg={12} xs={12}>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Submit Attendance
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
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
