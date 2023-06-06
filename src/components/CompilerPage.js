import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Dialog, Slide, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import qs from "qs";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "../components/APIHeader";
import { useEditor } from "../context/AppContext";

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
    setCompiled,
    setCustomInputsOutput,
    setCustomInputDisplay,
  } = useEditor() || {};
  const [compiling, setCompiling] = useState(false);
  const [badRequest, setBadRequest] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");
  const link = useParams();
  const jntu = localStorage.getItem("jntu");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCompiling(false);
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
    setCompiled(false);
    setCustomInputDisplay(false);
    setCustomInputValue("");
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
        setCompiling(true);
        setCompiled(true);
        setActualOutputValue(actualOutput);
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
    setCompiled(false);
    setCustomInputDisplay(false);
    setCustomInputValue("");
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
          // code: code
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
            sx={{ width: "100%", fontSize: 24 }}
          >
            {badRequest
              ? "Bad Request Please Check Your Code!"
              : `Sample Test Case Failed Please Try Again`}
          </Alert>
        </Stack>
      </Dialog>
    );
  };

  const compiledSuccessfully = () => {
    return (
      <Dialog open={compiling} onClose={handleClose}>
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

  const handleCustomInput = () => {
    setCustomInput(!customInput);
    setCustomInputValue("");
  };

  const customInputCompile = async (e) => {
    e.preventDefault();
    setWrongAnswerCheck(false);
    setOutput("");
    setError("");
    setIsCompiling(true);
    setCompiled(false);
    setCustomInputDisplay(false);
    const data = qs.stringify({
      code: code,
      language: language.value,
      input: customInputValue,
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
      } else {
        setCustomInputDisplay(true);
        setCustomInputsOutput(actualOutput);
      }
    } catch (err) {
      console.error(err.code);
      setBadRequest(true);
    }
    setIsCompiling(false);
  };

  const renderDialogCustomInputForm = () => {
    return (
      <div>
        <Slide
          in={customInput}
          direction="up"
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {/* form using textarea to input data */}
          <form
            onSubmit={(e) => customInputCompile(e)}
            className="flex flex-col gap-4 bg-gray-300 p-3 rounded-2xl"
          >
            <div className="flex flex-col gap-4">
              <textarea
                className="w-full h-32 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Please provide your input in the exact format specified"
                value={customInputValue}
                onChange={(e) => setCustomInputValue(e.target.value)}
                rows={2}
                cols={50}
                // ref={inputRef}
              ></textarea>
              <div className="flex gap-4 justify-end">
                <Button
                  className="w-[12vh] hover:text-black"
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={handleCustomInput}
                >
                  Cancel
                </Button>
                <Button
                  className="w-[12vh] hover:text-black"
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Run
                </Button>
              </div>
            </div>
          </form>
        </Slide>
      </div>
    );
  };

  return (
    <>
      <section className="">
        {/* <div className="flex gap-4">
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
        </div> */}
        <div className="flex gap-x-3 justify-end mt-[1vw] mr-[.5vw]">
          <Button
            className="w-[20vh] hover:text-black"
            variant="outlined"
            color="secondary"
            size="large"
            onClick={handleCustomInput}
            startIcon={
              !customInput ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
          >
            Custom Input
          </Button>
          <Button
            className="w-[18vh] hover:text-black"
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleRun}
            disabled={customInput}
          >
            {isCompiling ? "Compiling..." : "Run"}
          </Button>
          <Button
            className="w-[18vh]"
            variant="contained"
            color="success"
            size="large"
            onClick={handleSubmission}
            disabled={customInput}
          >
            {isSubmitting ? "Compiling..." : "Submit"}
          </Button>
        </div>
        <div className="w-2/4 mb-[2vh]">
          {customInput && renderDialogCustomInputForm()}
        </div>
      </section>
      {compiling && compiledSuccessfully()}
      {badRequest && badRequestMessage()}
      {wrongAnswer && badRequestMessage()}
    </>
  );
};

export default CompileButton;
