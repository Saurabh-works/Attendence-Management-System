
import React, { useState, useEffect,  useRef} from 'react';
import axios from 'axios';

// npm install react-to-print 

import { useReactToPrint } from "react-to-print";  // To save table data in pdf form

const StudentDataTable = () => {

//Shivanjali made this changes
const componentPDF = useRef();

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


    // Shivanjali Made this

    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle:"StudentDataTable",
      onAfterPrint: ()=> alert("Data saved in PDF")

    });


  return (
    <div>
      <h2 className='font-bold'>Student Data Table</h2>
      <div>
        <label>Select Batch: </label>
        <select value={selectedBatch} onChange={handleBatchChange}>
          <option value="">All Batches</option>
          <option value="A">A</option>
          <option value="B">B</option>
          
        </select>
<<<<<<< HEAD
      </div> <br/>
      <table width={500} className='border border-s-neutral-500'>
=======
      </div>

      {/* shivanjali made this */}
      <div ref={componentPDF} >


      <table>
>>>>>>> 219b08c6987eef5e656f18da79de34901d026122
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


      {/* Shivanjali made this changes */}
      <div>
         <button className="btn btn-success" onClick={ generatePDF }>Save as PDF</button>
      </div>



    </div>
  );
};

export default StudentDataTable;
