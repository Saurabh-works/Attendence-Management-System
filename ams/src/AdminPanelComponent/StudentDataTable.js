import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
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
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Label } from "@mui/icons-material";

const StudentDataTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const filteredStudents = selectedBatch
    ? students.filter((student) => student.batch === selectedBatch)
    : students;

  return (
    <div>
      <Container component="main" maxWidth="lg" sx={{padding:"25px"}}>
        <CssBaseline />
        <Typography variant="h5" align="center">Student Data</Typography>

        <Box component="div" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography variant="body2">Select Batch</Typography>
              <FormControl sx={{width:"300px"}}>
                <Select value={selectedBatch} onChange={handleBatchChange}>
                  <MenuItem value="" selected>All Batches</MenuItem>
                  <MenuItem value="A">Batch A</MenuItem>
                  <MenuItem value="B">Batch B</MenuItem>
                </Select>
              </FormControl>
           
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Batch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.batch}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default StudentDataTable;
