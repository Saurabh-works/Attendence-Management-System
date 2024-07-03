import React from "react";
import AttendanceComponent from "./AttendanceComponent";
import UpdateNewStudentData from "./UpdateNewStudentData";
import StudentDataTable from "./StudentDataTable";
import ShowStudentAttendance from "./ShowStudentAttendance";
import ShowBatchAttendance from "./ShowBatchAttendance";
import StudentReport from "./StudentReport";
import {
  Avatar,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import LayersIcon from "@mui/icons-material/Layers";
import ArticleIcon from "@mui/icons-material/Article";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function Dashboard() {
  return (
    <div style={{ backgroundColor: "#f3f3f3", margin: "0", padding: "0" }}>
      
      
        
        <Grid container md={12} justifyContent={"space-around"}>
          {/* cards */}
            <Typography variant="h5" marginRight={"auto"} sx={{paddingLeft:"25px", marginTop:"25px"}}>Hi, Welcome back</Typography>

          <Grid
            container
            mt={3}
            md={11.5}
            justifyContent={"space-between"}
            columnGap={0.2}
          >
            
            <Grid
              item
              sx={{
                backgroundColor: "#d0e9fd",
                height: "150px",
                borderRadius: "15px",
                boxShadow: "5px 5px 8px #cecece",
              }}
              md={2.7}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box component={"div"} textAlign={"center"}>
                <Avatar sx={{ bgcolor: "secondary", margin: "auto" }}>
                  <GroupsIcon />
                </Avatar>
                <Typography variant="h6" mt={1}>
                  200
                </Typography>
                <Typography variant="body2">Total Students</Typography>
              </Box>
            </Grid>

            <Grid
              item
              sx={{
                backgroundColor: "#d0f2fe",
                height: "150px",
                borderRadius: "15px",
                boxShadow: "5px 5px 8px #cecece",
              }}
              md={2.7}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box component={"div"} textAlign={"center"}>
                <Avatar sx={{ margin: "auto", bgcolor: "secondary" }}>
                  <LayersIcon />
                </Avatar>
                <Typography variant="h6" mt={1}>
                  5
                </Typography>
                <Typography variant="body2">Total Batches</Typography>
              </Box>
            </Grid>

            <Grid
              item
              sx={{
                backgroundColor: "#fef7cb",
                height: "150px",
                borderRadius: "15px",
                boxShadow: "5px 5px 8px #cecece",
              }}
              md={2.7}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box component={"div"} textAlign={"center"}>
                <Avatar sx={{ margin: "auto", bgcolor: "secondary" }}>
                  <ArticleIcon />
                </Avatar>
                <Typography variant="h6" mt={1}>
                  7
                </Typography>
                <Typography variant="body2">Report</Typography>
              </Box>
            </Grid>

            <Grid
              item
              sx={{
                backgroundColor: "#ffe7da",
                height: "150px",
                borderRadius: "15px",
                boxShadow: "5px 5px 8px #cecece",
              }}
              md={2.7}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box component={"div"} textAlign={"center"}>
                <Avatar sx={{ margin: "auto", bgcolor: "secondary" }}>
                  <BorderColorIcon />
                </Avatar>
                <Typography variant="h6" mt={1}>
                  23
                </Typography>
                <Typography variant="body2">Assignment Submited</Typography>
              </Box>
            </Grid>
          </Grid>
          {/* Attendence */}
          <Grid
            item
            mt={3}
            md={7}
            pb={3}
            sx={{
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "10px 10px 8px #cecece",
              height: "420px",
              overflow:"auto"
            }}
          >
            <AttendanceComponent></AttendanceComponent>
          </Grid>

          {/* Update Student */}
          <Grid
            item
            mt={3}
            md={4}
            pt={2}
            sx={{
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "10px 10px 8px #cecece",
              height: "420px",
            }}
          >
            <UpdateNewStudentData></UpdateNewStudentData>
          </Grid>

          {/* Student Data */}
         <Grid container md={11.5}>
         <Grid
            item
            mt={3}
            md={12}
            pb={3}
            sx={{
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "10px 10px 8px #cecece",
              height: "420px",
              overflow:"auto"
            }}
          >
            <StudentDataTable></StudentDataTable>
          </Grid>
         </Grid>
        </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr /> <br /> <br />
      <ShowStudentAttendance></ShowStudentAttendance> <hr /> <br /> <br />
      <ShowBatchAttendance></ShowBatchAttendance> <hr /> <br /> <br />
      <StudentReport></StudentReport> <hr /> <br /> <br />
    </div>
  );
}
export default Dashboard;
