import React, { useState } from 'react';
import axios from 'axios';

const UpdateNewStudentData = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentBatch, setStudentBatch] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !studentName || !studentBatch) {
      alert('Please enter ID, name, and batch.');
      return;
    }

    const newStudent = {
      id: parseInt(studentId),
      name: studentName,
      batch: studentBatch
    };

    try {
      await axios.post('http://localhost:5000/students', newStudent);

      alert('Student added successfully!');
      setStudentId('');
      setStudentName('');
      setStudentBatch('');
    } catch (error) {
      console.error('There was an error adding the student!', error);
      alert('There was an error adding the student. Please try again.');
    }
  };

  return (
    <div>
      <h1 className='font-bold'>Update Student Data Component</h1>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div>
          <label>Batch: </label>
          <input
            type="text"
            value={studentBatch}
            onChange={(e) => setStudentBatch(e.target.value)}
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default UpdateNewStudentData;
