import React from "react";
import AttendanceComponent from "./AttendanceComponent";
import UpdateNewStudentData from "./UpdateNewStudentData";
import StudentDataTable from "./StudentDataTable";
import { Grid } from "@mui/material";

function AdminPanelIndex() {
  return (
    <>
      <div>AdminPanel_index</div> <hr />
      <Grid container spacing={2}>
        <Grid item sx={12} md={6} lg={6}>
          <AttendanceComponent></AttendanceComponent>
        </Grid>

        <Grid item sx={12} md={6} lg={6}>
          <UpdateNewStudentData></UpdateNewStudentData>
        </Grid>
      </Grid>
      <StudentDataTable></StudentDataTable>
    </>
  );
}
export default AdminPanelIndex;
