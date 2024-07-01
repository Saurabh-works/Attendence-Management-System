import React from 'react'
import AttendanceComponent from './AttendanceComponent';
import UpdateNewStudentData from './UpdateNewStudentData';
import StudentDataTable from './StudentDataTable';
import ShowStudentAttendance from './ShowStudentAttendance';
import ShowBatchAttendance from './ShowBatchAttendance';
import StudentReport from './StudentReport';

function AdminPanelIndex() {
  return (
    <>
      <div>AdminPanel_index</div> <hr/> <br/> <br/>
      <AttendanceComponent></AttendanceComponent> <hr/> <br/> <br/>
      <UpdateNewStudentData></UpdateNewStudentData> <hr/> <br/> <br/>
      <StudentDataTable></StudentDataTable> <hr/> <br/> <br/>
      <ShowStudentAttendance></ShowStudentAttendance> <hr/> <br/> <br/>
      <ShowBatchAttendance></ShowBatchAttendance> <hr/> <br/> <br/>
      <StudentReport></StudentReport> <hr/> <br/> <br/>
    </>
  )
}
export default AdminPanelIndex;
