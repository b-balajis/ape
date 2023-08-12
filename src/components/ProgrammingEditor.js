/* eslint-disable react-hooks/exhaustive-deps */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor } from "../context/AppContext";
import Languages from "../data/languages.json";
import CompilerPage from "./CompilerPage";
import Editor from "./Editor";
// import screenfull from 'screenfull';

// function disableContextMenu(event) {
//   event.preventDefault();
// }

const ProgrammingEditor = () => {
  const {
    code,
    setCode,
    output,
    error,
    actualOutputValue,
    wrongAnswerCheck,
    compiled,
    customInputsOutput,
    customInputDisplay,
  } = useEditor() || {};
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState();
  const navigate = useNavigate();

  const link = useParams();
  const questionNum = link.question;
  const presentSem = localStorage.getItem("sem");
  const courseCode = link.courseCode;

  //to set the language value to language
  const dept = localStorage.getItem("dept");

  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(
        `/${presentSem}/${dept}/${courseCode.toUpperCase()}/${questionNum}/fetchQuestion`
      );
      const data = await response.json();
      setQuestion(data.question);
      const value = Languages.find((lang) => lang.value === data.language);
      setLanguage(value);
    }
    fetchQuestion();
  }, [questionNum]);

  // const handleDevTools = (e) => {
  //   alert("DevTools are not allowed. Please close the DevTools and try again.");
  // };

  // useEffect(() => {
  //   // Disable context menu
  //   document.addEventListener("contextmenu", disableContextMenu);

  //   // Detect DevTools
  //   document.addEventListener("keydown", function (event) {
  //     // Check if the DevTools shortcut was pressed (Cmd + Shift + I or Ctrl + Shift + I)
  //     if (
  //       (event.metaKey || event.ctrlKey) &&
  //       event.shiftKey &&
  //       event.keyCode === 73
  //     ) {
  //       handleDevTools(event);
  //     }
  //   });

  //   window.addEventListener("devtoolschange", function (event) {
  //     handleDevTools(event);
  //   });

  //   return () => {
  //     // Remove event listeners when the component is unmounted
  //     document.removeEventListener("contextmenu", disableContextMenu);
  //     document.removeEventListener("keydown", handleDevTools);
  //     window.removeEventListener("devtoolschange", handleDevTools);
  //   };
  // }, []);

  const handleMarksAllotment = () => {
    if (output[0] === output[1]) {
      return (
        <div className="items-center w-full p-[1vw] rounded-lg bg-green-500">
          <h1 className=" text-3xl font-semibold">Congratulations</h1>
          <p className="text-xl my-[1vh]">
            You have solved the question. Explore further by{" "}
            <Button onClick={() => navigate(-1)} className="text-black">
              clicking here
            </Button>
            for another question
          </p>
          <textarea
            name="output"
            id="output"
            className="w-full font-mono resize-none focus:outline-none text-black text-2xl bg-green-500 font-bold"
            cols="30"
            rows="1"
            value={output[0] + "/" + output[1] + " Test Cases Passed"}
            readOnly
            spellCheck={false}
          />
          <p className="text-2xl">You have Obtained 15 marks. </p>
        </div>
      );
    } else {
      return (
        <div className="items-center w-full p-[1vw] rounded-lg bg-red-500" >
          <h1 className=" text-3xl font-semibold">
            Several test cases have failed.
          </h1>
          <p className="text-xl my-[1vh]">Please check your code and try again.</p>
          <textarea
            name="output"
            id="output"
            className="w-full font-mono resize-none focus:outline-none text-black text-2xl bg-red-500 font-bold"
            cols="30"
            rows="1"
            value={output[0] + "/" + output[1] + " Test Cases Passed"}
            readOnly
            spellCheck={false}
          />
          <p className="text-2xl">You have Obtained 0 marks. </p>
        </div>
      );
    }
  };

  return (
    <>
      {question && (
        <div className="flex flex-col px-2 mx-auto">
          <div className="flex h-[100vh]">
            <div className="w-1/3 mr-[1vh] overflow-auto">
              <div className="flex left-[2vh] my-[1vh]">
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{
                    color: "white",
                    backgroundColor: "#1f2937",
                    "&:hover": {
                      backgroundColor: "#1f2957",
                    },
                  }}
                >
                  <ArrowBackIcon fontSize="medium" />
                </IconButton>
              </div>
              <div>
                <p className="text-3xl">
                  {question.qno}. {question.question}
                </p>
                <p className="text-xl mt-2">
                  <span className="font-bold">Description:</span>{" "}
                  {question.description}
                </p>
              </div>
              <section className="flex flex-col items-start justify-start gap-4 text-xl my-[2vh]">
                <div className="w-full">
                  <h1>Sample Input : </h1>
                  <h1 className="bg-slate-300 rounded-lg p-4">
                    <pre>{question.sampleinput}</pre>
                  </h1>
                </div>
                <div className="w-full">
                  <h1>Sample Output : </h1>
                  <h1 className="bg-slate-300 rounded-lg p-4">
                    <pre>{question.sampleoutput}</pre>
                  </h1>
                </div>
                <div className="w-full">
                  <h1>Input Format: </h1>
                  <h1 className="bg-slate-300 rounded-lg p-4">
                    <pre>Input format will be displayed here</pre>
                  </h1>
                </div>
                <div className="w-full">
                  <h1>Output Format: </h1>
                  <h1 className="bg-slate-300 rounded-lg p-4">
                    <pre>Output format will be displayed here</pre>
                  </h1>
                </div>
              </section>
            </div>
            <div className="border border-slate-400 mr-[1vh] h-[100vh]"></div>
            <div className="w-2/3 overflow-auto mt-[2vh]">
              <Editor
                language={language.language.toLocaleLowerCase()}
                code={code}
                setCode={setCode}
              />
              <div>
                <CompilerPage question={question} language={language} />
              </div>
              {wrongAnswerCheck && (
                <div className="w-full mb-[2vh] p-[2vh] bg-slate-300 space-y-2">
                  <div className=" border border-b-0 border-borderPrimary text-3xl font-bold text-red-700 rounded-lg">
                    Wrong Answer :{"("}
                  </div>
                  <h1 className="text-2xl font-bold">Your Output</h1>
                  <h1 className="text-2xl">
                    <pre>{actualOutputValue}</pre>
                  </h1>
                  <h1 className="text-2xl font-bold">Expected Output</h1>
                  <h1 className="text-2xl">
                    <pre>{question.sampleoutput}</pre>
                  </h1>
                </div>
              )}
              {/* if code code compiled successfully then display text */}
              {compiled && (
                <div className="w-full mb-[2vh] p-[2vh] bg-slate-300 space-y-2">
                  <div className=" border border-b-0 border-borderPrimary text-3xl font-bold text-green-700 rounded-lg">
                    Compilation Successful :{")"}
                  </div>
                  <h1 className="text-2xl font-bold">Your Output</h1>
                  <h1 className="text-2xl">
                    <pre>{actualOutputValue}</pre>
                  </h1>
                  <h1 className="text-2xl font-bold">Expected Output</h1>
                  <h1 className="text-2xl">
                    <pre>{question.sampleoutput}</pre>
                  </h1>
                </div>
              )}
              {error && (
                <div className="w-full px-2 mb-[2vh]">
                  <div className="p-2 border border-b-0 border-borderPrimary text-3xl font-bold text-red-700 bg-slate-300 rounded-lg">
                    Compilation Error :{"("}
                  </div>
                  <textarea
                    name="error"
                    id="error"
                    className="w-full p-[2vh] px-8 font-mono border border-borderPrimary bg-black text-red-600 resize-none focus:outline-none font-bold text-xl"
                    rows="6"
                    cols="30"
                    value={error}
                    readOnly
                    spellCheck={false}
                  />
                </div>
              )}
              {customInputDisplay && (
                <div className="m-[1vw] mb-[2vh] p-[2vh] bg-teal-600 space-y-2 rounded-lg">
                  <div className="text-3xl font-bold text-white ">
                    Output for Custom Input:
                  </div>
                  <h1 className="text-2xl">
                    <pre>{customInputsOutput}</pre>
                  </h1>
                </div>
              )}
              {output && (
                <div className="m-[1vh]">
                  {handleMarksAllotment()}
                  {/* <div className="p-2 border border-b-0 border-borderPrimary ">
                    Output
                    <div className="flex items-center gap-5 mt-2 text-sm ">
                      <span>
                        <span className="">Time</span> {output.cpuTime} sec
                      </span>
                      <span>
                        <span className="">Mem</span> {output.memory} kB
                      </span>
                    </div>
                  </div> */}
                  {/* <textarea
                    name="output"
                    id="output"
                    className="w-full p-2 font-mono border border-borderPrimary bg-background resize-none focus:outline-none text-black text-3xl"
                    cols="30"
                    rows="5"
                    value={output[0] + "/" + output[1] + " Test Cases Passed"}
                    readOnly
                    spellCheck={false}
                  /> */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgrammingEditor;
