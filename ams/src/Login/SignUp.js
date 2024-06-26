import React, { useState } from "react";
import { NavLink,  } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

function SignUp() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { userid, password, role };
    try {
      await axios.post("http://localhost:5000/users", newUser);
      alert("User registered successfully");
    } catch (error) {
      console.error("Error registering user", error);
      alert("Error registering user");
    }
  };

  return (
    <>
      

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "10px 10px 10px #cecece",
            padding:"25px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="User Id"
                  name="email"
                  autoComplete="email"
                  type="text"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Roll</InputLabel>
                  <Select
                    label="Select Roll"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                {/* <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link> */}
                <Link variant="body2" color="primary">
                  Already have an account?{" "}
                  <NavLink to="/login">Sign In</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;
