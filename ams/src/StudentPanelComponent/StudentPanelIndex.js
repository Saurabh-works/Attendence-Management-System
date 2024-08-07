
import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StudentReport from "../AdminPanelComponent/StudentReport";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShowStudentAttendance from "../AdminPanelComponent/ShowStudentAttendance";
import SchoolIcon from "@mui/icons-material/School";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import { NavLink } from "react-router-dom";



const StudentPanelIndex = () => {
        const [box, setbox] = useState(<ShowStudentAttendance />);

    const [mobileOpen, setMobileOpen] = useState(false);
    const drawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const drawewr = (
      <Box onClick={drawerToggle} sx={{ textAlign: "center" }}>
        <List>
          {/* Logo */}
          <ListItemButton sx={{ width: "180px", marginTop: "8px" }}>
            <img
              src="https://radiantitservices.in/assets/images/logo.png"
              alt="company logo"
            />
          </ListItemButton>
  
          
          
  
          {/* Student Attendence */}
          <ListItemButton
            sx={{
              backgroundColor: "white",
              borderRadius: "30px",
              width: "180px",
              marginBottom: "10px",
            }}
            onClick={()=>setbox(<ShowStudentAttendance/>)}
          >
            <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
              <SchoolIcon />
            </Avatar>
            <Typography variant="body2">Student Attendence</Typography>
          </ListItemButton>
  
          
            
  
          {/* Monthly Attendence */}
          <ListItemButton
            sx={{
              backgroundColor: "white",
              borderRadius: "30px",
              marginBottom: "10px",
              width: "180px",
            }}
            onClick={()=>setbox(<StudentReport/>)}
          >
            <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
              <PieChartIcon />
            </Avatar>
            <Typography variant="body2">Monthly Attendence</Typography>
          </ListItemButton>
  
         
  
          {/* LogOut */}
          <NavLink to="/login">
  
              <ListItemButton
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  marginBottom: "10px",
                  width: "180px",
                }}
                
              >
                <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
                  <LogoutIcon />
                </Avatar>
                <Typography variant="body2">LogOut</Typography>
              </ListItemButton>
              </NavLink>
        </List>
      </Box>
    );


    return(
        <>
        <div style={{ backgroundColor: "#f3f3f3", margin: "0", padding: "0" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ marginBottom: "25px" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            sx={{
              color: "white",
              display: { xs: "bolck", md: "none" },
            }}
            onClick={drawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <IconButton>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD78tIncXSE0NtnNasmNdK9wKE8zOV8xW88Q&s" />
          </IconButton>
          <IconButton sx={{ p: 0, marginLeft: "auto" }}>
            <Typography color={"white"} sx={{ marginRight: "15px" }}>
              Student Name
            </Typography>
            <Avatar
              alt="Teacher"
              src="https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* mobile nav */}
      <Box component={"nav"}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={drawerToggle}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "200px",
              backgroundColor: "#f3f3f3",
            },
          }}
        >
          {drawewr}
        </Drawer>
      </Box>
      <Grid container spacing={2} p={2} justifyContent={"space-around"}>
        {/* Sidebar */}
        <Grid item md={2} sx={{ display: { xs: "none", md: "block" } }}>
          <List>

    
            {/* Student Attendence */}
            <ListItemButton
              sx={{
                backgroundColor: "white",
                borderRadius: "30px",
                marginBottom: "10px",
              }}
              onClick={()=>setbox(<ShowStudentAttendance/>)}
            >
              <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
                <SchoolIcon />
              </Avatar>
              <Typography variant="body2">Student Attendence</Typography>
            </ListItemButton>

           
            {/* Student Monthly Attendence */}
            <ListItemButton
              sx={{
                backgroundColor: "white",
                borderRadius: "30px",
                marginBottom: "10px",
              }}
              onClick={()=>setbox(<StudentReport/>)}
            >
              <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
                <PieChartIcon />
              </Avatar>
              <Typography variant="body2">
                Student Monthly Attendence
              </Typography>
            </ListItemButton>

            

            {/* LogOut */}
            <NavLink to="/login">
              <ListItemButton
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  marginBottom: "10px",
                }}
              >
                <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
                  <LogoutIcon />
                </Avatar>
                <Typography variant="body2">LogOut</Typography>
              </ListItemButton>
            </NavLink>
          </List>
        </Grid>

        {/* Right Side Container */}
        <Grid container md={10}>
          {box}
        </Grid>
      </Grid>
    </div>



        </>
    )
}
export default StudentPanelIndex;