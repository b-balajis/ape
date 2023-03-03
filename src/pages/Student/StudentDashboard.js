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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { renderQuestions, fetchStudentDashboard } from "../../api/AppFunctions";

const StudentDashboard = () => {
  const [questions, setQuestions] = useState("");
  const [marks, setMarks] = useState("");

  const link = useParams();

  const sem = localStorage.getItem("sem");
  const data = JSON.parse(localStorage.getItem("userdata"));
  const jntu = data.jntu;
  const dept = data.dept;
  const sub = "python";

  const Qpayload = [dept, sem, sub];
  const payload = [dept, sem, sub, jntu];
  useEffect(() => {
    async function fetchQuestionsList() {
      const questions = await renderQuestions(Qpayload);
      setQuestions(questions);
    }
    fetchQuestionsList();

    async function fetchQuestionsMarks() {
      const marks = await fetchStudentDashboard(payload);
      setMarks(marks);
    }
    fetchQuestionsMarks();
  }, []);

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
                  {questions.map((row) => (
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
                    {marks.map((mark) => (
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
