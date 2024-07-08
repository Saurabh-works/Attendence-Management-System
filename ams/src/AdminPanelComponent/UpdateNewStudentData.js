import React, { useState } from "react";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
      <Container maxWidth="lg" sx={{ mt:3}}>
        <CssBaseline />
        <Grid
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding:"25px",
            borderRadius:"15px",
            boxShadow: "5px 5px 8px #cecece",
          }}
        >
          {/* icon */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}>
            <PersonAddIcon />
          </Avatar>

          {/* title */}
          <Typography variant="h6" textAlign={"center"}>
            Add New Student
          </Typography>

          {/* main form */}
          <Box component="form" sx={{ mt: 3, display:"flex", justifyContent:"center" }}>
            <Grid container spacing={2} md={12}>

              {/* user id */}
              <Grid item xs={12} md={12}>
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

              {/* name */}
              <Grid item xs={12} md={12}>
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

              {/* batch */}
              <Grid item xs={12} md={12}>
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

              {/* add student button */}
              <Grid item xs={12} md={12}>
                <Button type="submit" fullWidth variant="contained">
                  Add Student
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default UpdateNewStudentData;
