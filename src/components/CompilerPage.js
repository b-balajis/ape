import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEditor } from "../context/AppContext";
import qs from "qs";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Dialog from '@mui/material/Dialog';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CompileButton = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const { code, setOutput, setError, isSubmitting, setIsSubmitting } =
    useEditor() || {};

  const question = props.question;
  const noofTestCases = question.testcases;
  // Submit code to server

  const [responseData, setResponseData] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const sampleInput = question.sampleinput;
  const sampleOutput = question.sampleoutput;

  const handleRun = async () => {
    setIsCompiling(true);
    const data = qs.stringify({
      code: code,
      language: "py",
      input: sampleInput,
    });
    const config = {
      method: "post",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    try {
      const response = await axios(config);
      setResponseData(response.data);
      console.log("data", response.data);
      const actualOutput = response.data.output;
      const error = response.data.error;
      if (error !== "") {
        console.log("error", error);
        setError(error);
      } else {
        console.log("actual output", actualOutput);
        console.log(sampleOutput);
        setOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
    setIsCompiling(false);
  };

  const handleSubmission = async () => {
    setIsSubmitting(true);
    let noofTestCasesPassed = 0;
    for (let x in noofTestCases) {
      const testcaseInput = noofTestCases[x].input;
      const testcaseOutput = noofTestCases[x].output;
      const data = qs.stringify({
        code: code,
        language: "py",
        input: testcaseInput,
      });
      const config = {
        method: "post",
        url: "https://api.codex.jaagrav.in",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      try {
        const response = await axios(config);
        setResponseData(response.data);
        console.log("data", response.data);
        const actualOutput = response.data.output;
        const error = response.data.error;
        if (error !== "") {
          console.log("error", error);
          setError(error);
          break;
        }
        if (actualOutput === testcaseOutput && error === "") {
          noofTestCasesPassed++;
        } else {
          console.log("actual output", actualOutput);
          console.log("Test Case Failed");
          break;
        }
      } catch (err) {
        console.error(err);
      }
    }
    const output = [noofTestCasesPassed, noofTestCases.length];
    setOutput(output);
    setIsSubmitting(false);
  };

  const message = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Code Compiled Successfully <br/>
            Submit your code to get Grade
          </Alert>
      </Stack>
      </Dialog>
    )
  }

  return (
    <>
    <section className="flex justify-between">
      <div className="flex gap-4">
        {noofTestCases.map((sub, i) => (
          <>
            {isSubmitting ? (
              <Button variant="outlined" color="secondary">
                Test Case {i + 1}
              </Button>
            ) : (
              <Button variant="outlined" color="success">
                Test Case {i + 1}
              </Button>
            )}
          </>
        ))}
      </div>
      <div className="flex gap-x-4">
        <Button
          className="w-48 hover:text-white"
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleRun}
        >
          {isCompiling ? "Compiling..." : "Run"}
        </Button>
        <Button
          className="w-48"
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmission}
        >
          {isSubmitting ? "Compiling..." : "Submit"}
        </Button>
      </div>
    </section>
    {open && (message())}
    </>
  );
};

export default CompileButton;
