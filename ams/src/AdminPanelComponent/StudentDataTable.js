
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDataTable = () => {
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const filteredStudents = selectedBatch
    ? students.filter(student => student.batch === selectedBatch)
    : students;

  return (
    <div>
      <h2>Student Data Table</h2>
      <div>
        <label>Select Batch: </label>
        <select value={selectedBatch} onChange={handleBatchChange}>
          <option value="">All Batches</option>
          <option value="A">Batch A</option>
          <option value="B">Batch B</option>
          
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Batch</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.batch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDataTable;
