import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEditor } from "../context/AppContext";
import qs from "qs";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import Headers from "../components/APIHeader";
import { useParams } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CompileButton = (props) => {
  const {
    code,
    setOutput,
    setError,
    isSubmitting,
    setIsSubmitting,
    setSubmitted,
    setActualOutputValue,
    setWrongAnswerCheck,
  } = useEditor() || {};
  const [compiled, setCompiled] = useState(false);
  const [badRequest, setBadRequest] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const link = useParams();
  const jntu = localStorage.getItem("jntu");

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
  const language = props.language;

  const [responseData, setResponseData] = useState(null);
  if (responseData) {
    //
  }
  const [isCompiling, setIsCompiling] = useState(false);

  const sampleInput = question.sampleinput;
  const sampleOutput = question.sampleoutput;

  const handleRun = async () => {
    setWrongAnswerCheck(false);
    setOutput("");
    setError("");
    setIsCompiling(true);
    const data = qs.stringify({
      code: code,
      language: language.value,
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
      } else if (actualOutput === sampleOutput) {
        setCompiled(true);
      } else if (actualOutput !== sampleOutput) {
        setWrongAnswer(true);
        setWrongAnswerCheck(true);
        setActualOutputValue(actualOutput);
      }
    } catch (err) {
      console.error(err.code);
      setBadRequest(true);
    }
    setIsCompiling(false);
  };

  const handleSubmission = async () => {
    setWrongAnswerCheck(false);
    setIsSubmitting(true);
    setOutput("");
    setError("");
    const totalMarksObtained = await handleCodeSubmission();
    setSubmitted(true);
    setIsSubmitting(false);
    handleSubmitMarks(totalMarksObtained);
  };

  const handleCodeSubmission = async () => {
    let noofTestCasesPassed = 0;
    let totalMarksObtained = 0;
    for (let x in noofTestCases) {
      const testcaseInput = noofTestCases[x].input;
      const testcaseOutput = noofTestCases[x].output;
      const data = qs.stringify({
        code: code,
        language: language.value,
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
          const marksforTestCase = question.testcases[x].marks;
          totalMarksObtained = totalMarksObtained + marksforTestCase;
          console.log(totalMarksObtained);
          noofTestCasesPassed++;
        } else {
          console.log("Failed");
        }
      } catch (error) {
        console.log("error", error);
        setError(error.message);
      }
    }
    const output = [noofTestCasesPassed, noofTestCases.length];
    setOutput(output);
    return totalMarksObtained;
  };

  const section = localStorage.getItem("sec");

  const handleSubmitMarks = async (totalMarks) => {
    const res = await fetch(
      `/${link.courseCode.toUpperCase()}/${section}/${jntu}/submitMarks`,
      {
        method: "POST",
        headers: Headers,
        body: JSON.stringify({
          qno: Number(link.question),
          marks: totalMarks,
        }),
      }
    );
    console.log(res, "output");
  };

  const badRequestMessage = () => {
    return (
      <Dialog open={badRequest || wrongAnswer} onClose={handleClose}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%", fontSize: 30 }}
          >
            {badRequest ? "Bad Request" : "Wrong Answer"}
          </Alert>
        </Stack>
      </Dialog>
    );
  };

  const compiledSuccessfully = () => {
    return (
      <Dialog open={compiled} onClose={handleClose}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", fontSize: 30 }}
          >
            Code Compiled Successfully <br />
            Submit your code to get Grade
          </Alert>
        </Stack>
      </Dialog>
    );
  };

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
      {compiled && compiledSuccessfully()}
      {badRequest && badRequestMessage()}
      {wrongAnswer && badRequestMessage()}
    </>
  );
};

export default CompileButton;
