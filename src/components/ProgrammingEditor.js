/* eslint-disable react-hooks/exhaustive-deps */
import { useEditor } from "../context/AppContext";
import CompilerPage from "./CompilerPage";
import Editor from "./Editor";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Languages from "../data/languages.json";

const ProgrammingEditor = () => {
  const { code, setCode, output, error } = useEditor() || {};
  const [question, setQuestion] = useState("");

  const link = useParams();
  const location = useLocation();
  const questionNum = link.question;
  const presentSem = localStorage.getItem("sem");
  const subjectName = link.subjectName;
  const lan = location.state.language;
  
  //to set the language value to language
  const language = Languages.find((lang) => lang.value === lan);
  console.log(language);
  const dept = localStorage.getItem("dept");

  useEffect(() => {
    async function fetchPresentSemData() {
      const response = await fetch(
        `/${presentSem}/${dept}/${subjectName.toUpperCase()}/${questionNum}/fetchQuestion`
      );
      const data = await response.json();
      setQuestion(data);
    }
    fetchPresentSemData();
  }, [questionNum])

  useEffect(() => {
    function disableRightClick(e) {
      if (e.button === 2) {
        e.preventDefault();
        return false;
      }
    }

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  const handleMarksAllotment = () => {
    const result = (output[0] / output[1]) * 15;
    console.log(result, "result");
    
    // const setResult = {
    //   id: questionNum,
    //   marks: result,
    // };
    // const resultPayload = [dept, sem, sub, jntu, questionNum, setResult];
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
            <Editor language={language.language} code={code} setCode={setCode} />
          </section>

          <CompilerPage question={question} />

          <section className="flex flex-col items-start justify-start gap-4 text-white">
            <div>
              <h1>Sample Input : </h1>
              <h1>{question.sampleinput}</h1>
            </div>
            <div>
              <h1>Sample Output : </h1>
              <h1>{question.sampleoutput}</h1>
            </div>

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
