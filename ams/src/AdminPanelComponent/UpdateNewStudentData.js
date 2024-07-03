import React, { useState } from "react";
import axios from "axios";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";

const UpdateNewStudentData = () => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentBatch, setStudentBatch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !studentName || !studentBatch) {
      alert("Please enter ID, name, and batch.");
      return;
    }

    const newStudent = {
      id: parseInt(studentId),
      name: studentName,
      batch: studentBatch,
    };

    try {
      await axios.post("http://localhost:5000/students", newStudent);

      alert("Student added successfully!");
      setStudentId("");
      setStudentName("");
      setStudentBatch("");
    } catch (error) {
      console.error("There was an error adding the student!", error);
      alert("There was an error adding the student. Please try again.");
    }
  };

  return (
    <>
      <Container maxWidth="lg" >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
     
          }}
        >
          <Avatar  sx={{ m: 1, bgcolor: "secondary", marginBottom:"15px"}}>
            <PersonAddIcon sx={{color:pink}}/>
          </Avatar>
          <Typography variant="h6" textAlign={"center"}>
            Add New Student
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  label="User Id"
                  name="id"
                  type="number"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  label="Batch"
                  name="batch"
                  type="text"
                  value={studentBatch}
                  onChange={(e) => setStudentBatch(e.target.value)}
                />
              </Grid>

              <Grid item md={12}>
                <Button type="submit" fullWidth variant="contained">
                  Add Student
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UpdateNewStudentData;
