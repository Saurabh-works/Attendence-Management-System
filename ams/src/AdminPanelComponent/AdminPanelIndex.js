import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ShowBatchAttendance from "./ShowBatchAttendance";
import StudentDataTable from "./StudentDataTable";
import Dashboard from "./Dashboard";
import StudentReport from "./StudentReport";

const AdminPanelIndex = () => {
    const [box, setbox]=useState(<Dashboard/>)
    const dashboard= ()=>{
        setbox(<Dashboard/>)
    }
    const attendence= ()=>{
        setbox(<ShowBatchAttendance/>)
    }
    const report= ()=>{
        setbox(<StudentReport/>)
    }
  return (
    <div style={{ backgroundColor: "#f3f3f3", margin: "0", padding: "0" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ marginBottom: "25px" }}>
        <Toolbar>
          <IconButton>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD78tIncXSE0NtnNasmNdK9wKE8zOV8xW88Q&s" />
          </IconButton>
          <IconButton sx={{ p: 0, marginLeft: "auto" }}>
            <Typography color={"white"} sx={{ marginRight: "15px" }}>
              Teacher Name
            </Typography>
            <Avatar
              alt="Teacher"
              src="https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </IconButton>
        </Toolbar>
      </AppBar>
        <Grid container spacing={2} p={2} justifyContent={"space-around"}>
          {/* Sidebar */}
          <Grid item md={2}>
            <List>
              <ListItemButton
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  marginBottom: "18px",
                }}
                onClick={dashboard}
              >
                <Avatar sx={{ marginRight: "15px", bgcolor: "secondary" }}>
                  <DashboardIcon />
                </Avatar>
                <Typography variant="body2">Dashboard</Typography>
              </ListItemButton>

              <ListItemButton
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  marginBottom: "18px",
                }}
                onClick={attendence}

              >
                <Avatar sx={{ marginRight: "15px", bgcolor: "secondary" }}>
                  <FactCheckIcon />
                </Avatar>
                <Typography variant="body2">Attendence</Typography>
              </ListItemButton>

              <ListItemButton
                sx={{ backgroundColor: "white", borderRadius: "30px" }} onClick={report}

              >
                <Avatar sx={{ marginRight: "15px", bgcolor: "secondary" }}>
                  <AssessmentIcon />
                </Avatar>
                <Typography variant="body2">Report</Typography>
              </ListItemButton>
            </List>
          </Grid>
          <Grid container md={10}>
            {box}
          </Grid>
        </Grid>
    </div>
  );
};

export default AdminPanelIndex;
