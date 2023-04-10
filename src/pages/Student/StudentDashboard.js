/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Python from "../../data/python.json";
// import Marks from "../../data/marks.json";
import Divider from "@mui/material/Divider";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [questions, setQuestions] = useState("");
  const [marks, setMarks] = useState("");

  const sem = localStorage.getItem("sem");
  const dept = localStorage.getItem("dept");
  const jntu = "19341A1217";

  const courseCode = window.location.pathname.split("/")[2];
  console.log(courseCode);

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch(`
      /${sem}/${dept}/${courseCode}/fetchQuestions`);
      const data = await response.json();
      setQuestions(data);
    }
    fetchQuestions();
  }, []);

  // useEffect(() => {
  //   async function fetchQuestions() {
  //     const response = await fetch(`/studentDashboard?sem=${sem}&subject=${courseCode}&jntu=${jntu}`);
  //       const data = await response.json();
  //     setMarks(data);
  //     console.log(data);
  //   }
  //   fetchQuestions();
  // }, [])

  useEffect(() => {});
  console.log(questions);
  console.log(marks);
  return (
    <>
      <Navbar />
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
          aria-label="simple table"
        >
          <div className="flex w-full">
            <div className="w-9/12">
              <TableCell>S. No</TableCell>
              <TableCell>Question Name</TableCell>
            </div>
            <div className="3/12">
              <TableCell>Marks</TableCell>
              <TableCell>Grade</TableCell>
            </div>
          </div>
          <Divider />
          <TableBody>
            <div className="flex w-full">
              {questions.length !== 0 && (
                <div className="w-9/12">
                  {Object.values(questions).map((row) => (
                    <TableRow>
                      <TableCell>{row.qno}</TableCell>
                      <TableCell className="ml-8">{row.question}</TableCell>
                    </TableRow>
                  ))}
                </div>
              )}
              <div>
                {marks.length !== 0 && (
                  <div className="3/12">
                    {Object.values(marks).map((mark) => (
                      <TableRow>
                        <TableCell>{mark.marks}</TableCell>
                        <TableCell>{mark.grade}</TableCell>
                      </TableRow>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TableBody>
          <Divider />
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentDashboard;
