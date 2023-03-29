
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
  const { code, setOutput, setError, isSubmitting, setIsSubmitting, setSubmitted } =
    useEditor() || {};
  const [compiled, setCompiled] = useState(false);
  const [badRequest, setBadRequest] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [actualOutputValue, setActualOutputValue] = useState();
  const [sampleOutputValue, setSampleOutputValue] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCompiled(false);
    setBadRequest(false);
    setWrongAnswer(false);
  };

  const question = props.question;
  const noofTestCases = question.testcases;

  const [responseData, setResponseData] = useState(null);
  if(responseData){
    //
  }
  const [isCompiling, setIsCompiling] = useState(false);

  const sampleInput = question.sampleinput;
  const sampleOutput = question.sampleoutput;

  const handleRun = async () => {
    setOutput("")
    setError("");
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
      const actualOutput = response.data.output;
      const error = response.data.error;
      if (error !== "") {
        console.log("error", error);
        setError(error);
      } else if ( actualOutput === sampleOutput){
        setCompiled(true)
      }
       else if ( actualOutput !== sampleOutput) {
        setWrongAnswer(true);
        setActualOutputValue(actualOutput);
        setSampleOutputValue(sampleOutput);
      }
    } catch (err) {
      console.error(err.code);
      setBadRequest(true);
    }
    setIsCompiling(false);
  };

  const handleSubmission = async () => {
    setIsSubmitting(true);
    setOutput("")
    setError("");
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
    setSubmitted(true);
    setOutput(output);
    setIsSubmitting(false);
  };

  const badRequestMessage = () => {
    return (
      <Dialog open={badRequest || wrongAnswer} onClose={handleClose}>
        <Stack spacing={2} sx={{ width: "100%"}}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%", fontSize: 30 }}
          >
            {badRequest ? "Bad Request" : "Wrong Answer"}
          </Alert>
      </Stack>
      </Dialog>
    )
  }

  const compiledSuccessfully = () => {
    return (
      <Dialog open={compiled} onClose={handleClose}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", fontSize: 30 }}
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
    {compiled && (compiledSuccessfully())}
    {(badRequest) && (badRequestMessage())}
    {wrongAnswer && (badRequestMessage())}
    </>
  );
};

export default CompileButton;
