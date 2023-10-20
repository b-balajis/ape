/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const QuestionView = () => {
  const [questionData, setQuestion] = useState("");
  const location = useLocation();
  const link = useParams();
  console.log(location.state);
  const {courseCode, sem } = location.state;
  const dept = localStorage.getItem("dept");
  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(
        `/${sem}/${dept}/${courseCode}/${link.question}/fetchQuestion`
      );
      const data = await response.json();
      setQuestion(data.question);
    }
    fetchQuestion();
  }, [link.question]);
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
            <Typography>
              {questionData.description}
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
                <Typography variant="h6" gutterBottom>
                  Marks:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {tc.marks}:
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
