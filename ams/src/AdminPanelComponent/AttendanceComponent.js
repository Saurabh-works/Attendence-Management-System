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
  Paper,
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

    const attendanceData = Object.keys(attendance)
      .filter(studentId => students.some(student => student.id === studentId && student.batch === batch))
      .map((studentId) => ({
        studentId,
        status: attendance[studentId],
      }));

    const existingAttendance = await axios.get("http://localhost:5000/attendance");
    const dateAttendance = existingAttendance.data[date] || {};
    const batchAttendance = dateAttendance[batch] || [];

    const updatedAttendance = {
      ...existingAttendance.data,
      [date]: {
        ...dateAttendance,
        [batch]: [
          ...batchAttendance,
          ...attendanceData.filter(data => !batchAttendance.some(record => record.studentId === data.studentId))
        ],
      },
    };

    await axios.put("http://localhost:5000/attendance", updatedAttendance);
    alert("Attendance submitted successfully!");
  };

  const filteredStudents = students.filter((student) => student.batch === batch);

  return (
    <>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box component="div" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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

            <Grid item md={6} lg={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item md={12} lg={12} xs={12}>
              <TableContainer component={Paper} sx={{ textAlign: "center" }}>
                <Table sx={{ textAlign: "center" }} stickyHeader aria-label="sticky table">
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
                            onClick={() => handleAttendance(student.id, "Present")}
                          >
                            Present
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            sx={{ marginLeft: { xs: "0", md: "10px" }, fontSize: { xs: "8px", md: "" } }}
                            onClick={() => handleAttendance(student.id, "Absent")}
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

