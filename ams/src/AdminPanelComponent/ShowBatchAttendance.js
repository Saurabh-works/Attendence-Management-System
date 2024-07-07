<<<<<<< HEAD
import React, { useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {
  Container,
  Grid,
  TextField,
  Box,
  FormControl,
  Button,
  Snackbar,
  Alert,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Avatar, CssBaseline, Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
=======
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from "react-to-print"; 
import BatchReport from '../Report/BatchReport';
import { Link, Route} from "react-router-dom";
>>>>>>> 0e1884c82dccb766d469e222cd98fe4885a87e16

const ShowBatchAttendance = () => {
  const componentPDF = useRef();
  const [batch, setBatch] = useState("");
  const [date, setDate] = useState("");
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  const handleFetchAttendance = async () => {
    setOpen(true)
    if (!batch || !date) {
      setError("Please select both batch and date.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/attendance`);
      const attendanceData = response.data;

      if (attendanceData[date] && attendanceData[date][batch]) {
        const batchAttendance = attendanceData[date][batch];

        const studentResponse = await axios.get(
          `http://localhost:5000/students`
        );
        const students = studentResponse.data;

        const attendanceWithDetails = batchAttendance.map((att) => {
          const student = students.find((s) => s.id === att.studentId);
          return {
            ...student,
            status: att.status,
          };
        });

        setAttendanceDetails(attendanceWithDetails);
        setError("");
      } else {
        setError("No attendance records found for the given date and batch.");
        setAttendanceDetails([]);
      }
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      setError("Error fetching attendance details. Please try again.");
      setAttendanceDetails([]);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "StudentDataTable",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <div ref={componentPDF}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
            }} 
          >
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}
            >
              <AssessmentIcon />
            </Avatar>
            <Typography variant="h6" textAlign={"center"}>
              Batch Attendance
            </Typography>

<<<<<<< HEAD
            <Box
              onSubmit={handelSubmit}
              component="form"
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
=======
 <div>
         <button className="btn btn-success" onClick={ generatePDF }>Save as PDF</button>
      </div> 

      <div>
        {/* <Link to="/BatchReport">Batch Report</Link> */}
        <BatchReport>BatchReport</BatchReport>
      </div>
      </>
>>>>>>> 0e1884c82dccb766d469e222cd98fe4885a87e16

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleFetchAttendance}
                  >
                    Fetch Attendance
                  </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button variant="contained" fullWidth onClick={generatePDF}>
                    Save as PDF
                  </Button>
                </Grid>

                {error && (
                  <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                  >
                    <Alert severity="error">{error}</Alert>
                  </Snackbar>
                )}

                {attendanceDetails.length > 0 && (
                  <Grid item xs={12}>
                    <Typography align="center" variant="h6">
                      Attendance Details
                    </Typography>
                    <TableContainer
                      component={"paper"}
                      sx={{ textAlign: "center" }}
                    >
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
                              <b>Status</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {attendanceDetails.map((student) => (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">
                              <Typography variant="body2">
                              {student.id}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">
                              {student.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {student.batch}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {student.status}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                         ))}
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
                
              </Grid>
            </Box>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default ShowBatchAttendance;
