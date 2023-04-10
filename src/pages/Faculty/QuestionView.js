/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Navbar from "./Navbar";

const QuestionView = () => {
  const [questionData, setQuestion] = useState("");
  const location = useLocation();
  const subjectName = location.state.subjectName;
  const presentSem = location.state.sem;
  const questionNum = location.state.question.qno;
  const dept = localStorage.getItem("dept");
  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(
        `/${presentSem}/${dept}/${subjectName}/${questionNum}/fetchQuestion`
      );
      const data = await response.json();
      console.log(data);
      setQuestion(data);
    }
    fetchQuestion();
  }, [questionNum]);
  const { qno, question, sampleinput, sampleoutput, testcases } = questionData;
  return (
    <>
    <Navbar />
      {questionData && (
        <div>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
              {`Question ${qno}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {question}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Sample Input:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {sampleinput}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Sample Output:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {sampleoutput}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Test Cases:
            </Typography>
            {testcases?.map((tc, index) => (
              <Box key={index} sx={{ padding: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {`Test Case ${index + 1}`}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Input:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {tc.input}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Output:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {tc.output}
                </Typography>
              </Box>
            ))}
          </Box>
        </div>
      )}
    </>
  );
};

export default QuestionView;
