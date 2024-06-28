import React from 'react'
import AttendanceComponent from './AttendanceComponent';
import UpdateNewStudentData from './UpdateNewStudentData';
import StudentDataTable from './StudentDataTable';

function AdminPanelIndex() {
  return (
    <>
      <div>AdminPanel_index</div> <hr/>
      <AttendanceComponent></AttendanceComponent> <hr/>
      <UpdateNewStudentData></UpdateNewStudentData> <hr/>
      <StudentDataTable></StudentDataTable>
    </>
  )
}
export default AdminPanelIndex;
