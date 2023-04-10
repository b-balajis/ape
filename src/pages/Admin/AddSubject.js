import * as React from "react";
import { useState } from "react";
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
import semesters from "../../data/sem.json";
import languages from "../../data/languages.json";
import Navbar from "./Navbar";
import headers from "../../components/APIHeader";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";


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
  const [semester, setSemester] = useState("");
  const [subject, setSubjectName] = useState();
  const [courseId, setSubjectId] = useState();
  const [credits, setCredits] = useState();
  const [language, setLanguage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeSem = (e) => {
    setSemester(e.target.value);
  };

  const submitData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/addSubject", {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          semester,
          subject,
          courseId,
          credits,
          language,
        }),
      });
      const data = await res.json();
      if(data?.success){
        alert("Subject Added Successfully");
        navigate("/a/dashboard");
      }else if(data.error){
        alert(data.error);
      }
      else{
        alert("Something Went Wrong");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
  };

  const handleChangeCredits = (event) => {
    const input = event.target.value;

    if (input === '' || (!isNaN(input) && input >= 1 && input <= 4)) {
      setCredits(input);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="flex justify-center place-items-center v-screen h-screen">
          <Loader />
        </div>
      )}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
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
              Add New Subject
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: "70%" }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="fullName"
                    required
                    fullWidth
                    id="fullName"
                    label="Subject Name"
                    autoFocus
                    value={subject}
                    onChange={(e) => {
                      setSubjectName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    label="Course ID"
                    name="id"
                    value={courseId}
                    onChange={(e) => setSubjectId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    id="id"
                    label="Credits"
                    fullWidth
                    required
                    value={credits}
                    onChange={handleChangeCredits}
                    InputProps={{
                      inputProps: { min: 1, max: 4 },
                      style: { '-moz-appearance': 'textfield', '-webkit-appearance': 'none' },
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      disableSpinButtons: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: 0 }} fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Select Language
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={language}
                      label="Select Language"
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      {languages.map((language) => (
                        <MenuItem value={language.value} key={language.id}>
                          {language.language}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: 0 }} fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Semester
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={semester}
                      label="Department"
                      onChange={handleChangeSem}
                    >
                      {semesters.map((sem) => (
                        <MenuItem value={sem.value} key={sem.id}>{sem.sem}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                Add Subject
              </Button>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}
