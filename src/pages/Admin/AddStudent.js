import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Departments from "../../data/depts.json";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "./Navbar";
import { useState } from "react";
import Header from "../../components/APIHeader";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [batch, setValue] = useState(dayjs("2023-04-07"));
  const [email, setEmail] = useState();
  const [jntu, setJntu] = useState();
  const [dept, setDept] = useState("");
  const [sec, setSec] = useState("");
  const [type, setStudentType] = useState();
  const [gender, setGender] = useState();
  const [name, setFullName] = useState();
  const [mobile, setMobileNum]  = useState();
  const [password, setPassword] = useState();

  const handleDept = (event) => {
    setDept(event.target.value);
  };

  const handleSec = (event) => {
    setSec(event.target.value);
  };

  const handleJntu = (e) => {
    setJntu(e.target.value.toUpperCase());
  }

  const handleFullName = (e) => {
    setFullName(e.target.value.toUpperCase());
  }

  const submitStudentData = async () => {
    try{
      const res = await fetch(`/createNewStudent`, {
        method: "POST",
        headers: Header,
        body: JSON.stringify({
          jntu,
          email: `${email}@gmrit.edu.in`,
          name,
          dept,
          sec,
          batch,
          type,
          mobile,
          password,
          gender,
          usertype: "student"
      })
      });
      const data = await res.json();
      if (data.success){
        alert("Student Account Created Successfully");
        window.location.reload();
      }
      else{
        alert(data.message);
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value.toUpperCase());
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    submitStudentData();
  };


  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Student Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="jntu"
                    label="JNTU Number"
                    autoFocus
                    value={jntu}
                    onChange={(e) => handleJntu(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="fullName"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    value={name}
                    onChange={(e) => handleFullName(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // error
                    // helperText="Incorrect entry."
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => handleEmail(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          @gmrit.edu.in
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ minWidth: 0 }} fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={dept}
                      label="Department"
                      onChange={handleDept}
                    >
                      {Departments.map((dept) => {
                        if (dept.branch !== "BSH") {
                          return (
                            <MenuItem value={dept.branch}>{dept.name}</MenuItem>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ minWidth: 0 }} fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Section
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={sec}
                      label="Section"
                      onChange={handleSec}
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ minWidth: 0 }} fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Student Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={type}
                      label="Department"
                      onChange={(e) => setStudentType(e.target.value)}
                    >
                      <MenuItem value="regular">Regular</MenuItem>
                      <MenuItem value="lateral">Lateral</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ minWidth: 0 }} fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={gender}
                      label="Department"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DatePicker
                        views={["year"]}
                        label="Admitted Year"
                        value={batch}
                        minDate={new Date("2019")}
                        // maxDate={new Date()}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="mobile"
                    label="Mobile Number"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobileNum(e.target.value)}
                    onKeyPress={(event) => {
                      if (!/[0-9+]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1,
                  fontSize: "18px",
                  width: "70%",
                  ml: "15%",
                }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}
