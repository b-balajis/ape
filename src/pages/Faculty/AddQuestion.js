import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const theme = createTheme();

const AddQuestion = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log("data", data);
  };

  const [question, setQuestion] = useState();
  const [description, setDescription] = useState();
  const [textareaFields, setTextareaFields] = useState([]);
  const [sampleInput, setSampleInput] = useState([]);
  const [sampleOutput, setSampleOutput] = useState([]);

  const handleAddTextarea = () => {
    setTextareaFields([...textareaFields, { value: "" }]);
  };

  const handleTextareaChange = (event, index) => {
    const newTextareaFields = [...textareaFields];
    newTextareaFields[index].value = event.target.value;
    setTextareaFields(newTextareaFields);
  };

  const handleRemoveTextarea = (index) => {
    const newTextareaFields = [...textareaFields];
    newTextareaFields.splice(index, 1);
    setTextareaFields(newTextareaFields);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#fff",
              paddingX: "10vh",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Question
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  name="question"
                  required
                  fullWidth
                  id="question"
                  label="Question Name"
                  autoFocus
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="sampleinput"
                  label="Sample Input "
                  name="sampleinput"
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="sampleoutput"
                  label="Sample Output"
                  name="sampleoutput"
                  value={sampleOutput}
                  onChange={(e) => setSampleOutput(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              sx={{
                paddingX: "9vw",
                marginY: "2vh",
              }}
              onClick={handleAddTextarea}
              variant="outlined"
            >
              Add Test Cases
            </Button>
            {textareaFields.map((textareaField, index) => (
                <Grid
                  container
                  fullWidth
                  key={index}
                >
                <div className="flex">
                  <div className=" left-0">TestCase : {index + 1}</div>
                  <div className="absolute right-1/4">
                    <Button onClick={() => handleRemoveTextarea(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
                  <Grid
                    item
                    xs={12}
                    marginY={2}
                  >
                    <TextField
                      required
                      fullWidth
                      id="input"
                      label={"Textcase Input " + (index + 1)}
                      name="input"
                      // value={textcaseInput.value}
                      onChange={(e) => handleTextareaChange(e, index)}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      fullWidth
                      id="output"
                      label={"Textcase Output " + (index + 1)}
                      name="output"
                      // value={textcaseOutput.value}
                      onChange={(e) => handleTextareaChange(e, index)}
                    />
                  </Grid>
                </Grid>
            ))}
            <Button
              type="submit"
              variant="contained"
              sx={{
                paddingX: "16vw",
                marginY: "2vh",
              }}
            >
              Add Question
            </Button>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AddQuestion;
