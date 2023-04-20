/* eslint-disable react-hooks/exhaustive-deps */
import { useEditor } from "../context/AppContext";
import CompilerPage from "./CompilerPage";
import Editor from "./Editor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Languages from "../data/languages.json";
import screenfull from 'screenfull';

function disableContextMenu(event) {
  event.preventDefault();
}

const ProgrammingEditor = () => {
  const { code, setCode, output, error, actualOutputValue, wrongAnswerCheck } =
    useEditor() || {};
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState();

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

  const handleDevTools = (e) => {
    alert(
      "DevTools are not allowed. Please close the DevTools and try again."
    )
  }

  useEffect(() => {

    // Disable context menu
    document.addEventListener("contextmenu", disableContextMenu);

    // Detect DevTools
    document.addEventListener("keydown", function (event) {
      // Check if the DevTools shortcut was pressed (Cmd + Shift + I or Ctrl + Shift + I)
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.keyCode === 73
      ) {
        handleDevTools(event);
      }
    });

    window.addEventListener("devtoolschange", function (event) {
      handleDevTools(event);
    });

    return () => {
      // Remove event listeners when the component is unmounted
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", handleDevTools);
      window.removeEventListener("devtoolschange", handleDevTools);
    };
  }, []);

  const handleMarksAllotment = () => {
    if (output[0] === output[1]) {
      return (
        <div className="flex items-center justify-center w-full h-12 bg-green-500">
          <h1 className="text-white text-2xl">All Test Cases Passed</h1>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-12 bg-red-500">
          <h1 className="text-white text-2xl">Some Test Cases Failed</h1>
        </div>
      );
    }
  };

  return (
    <>
      {question && (
        <div className="flex flex-col w-4/5 gap-10 p-4 mx-auto mt-3">
          <h1 className="font-bold text-white text-3xl">
            {question.qno}. {question.question}
          </h1>
          <section className="flex-grow h-[80vh]">
            <Editor
              language={language.language}
              code={code}
              setCode={setCode}
            />
          </section>

          <CompilerPage question={question} language={language} />

          <section className="flex flex-col items-start justify-start gap-4 text-white">
            <div>
              <h1>Sample Input : </h1>
              <h1>{question.sampleinput}</h1>
            </div>
            <div>
              <h1>Sample Output : </h1>
              <h1>{question.sampleoutput}</h1>
            </div>

            {wrongAnswerCheck && (
              <div>
                <h1>Actual Output : </h1>
                <h1>{actualOutputValue}</h1>
              </div>
            )}
            {/* Output area */}
            {output && (
              <div className="w-full">
                {handleMarksAllotment()}
                <div className="p-2 border border-b-0 border-borderPrimary text-white">
                  Output
                  <div className="flex items-center gap-5 mt-2 text-sm ">
                    <span>
                      <span className="text-white">Time</span> {output.cpuTime}{" "}
                      sec
                    </span>
                    <span>
                      <span className="text-white">Mem</span> {output.memory} kB
                    </span>
                  </div>
                </div>
                <textarea
                  name="output"
                  id="output"
                  className="w-full p-2 font-mono border border-borderPrimary bg-background resize-none focus:outline-none text-black text-3xl"
                  cols="30"
                  rows="5"
                  value={output[0] + "/" + output[1] + " Test Cases Passed"}
                  readOnly
                  spellCheck={false}
                />
              </div>
            )}
            {error && (
              <div className="w-full">
                <div className="p-2 border border-b-0 border-borderPrimary text-white">
                  Error
                </div>
                <textarea
                  name="error"
                  id="error"
                  className="w-full p-2 font-mono border border-borderPrimary bg-background resize-none focus:outline-none text-red-700 font-bold text-xl"
                  cols="30"
                  rows="5"
                  value={error}
                  readOnly
                  spellCheck={false}
                />
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default ProgrammingEditor;
