/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
// import Subjects from "../../data/Subjects.json";
import { NavLink, useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Subject = () => {
  const [questions, setQuestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const link = useParams();

  const sem = localStorage.getItem("sem");
  const data = JSON.parse(localStorage.getItem("user"));
  const dept = data.dept;
  const sub = link.subjectName;

  const payload = [dept, sem, sub];


  let subName = location.state.subjectName;
  // const subjectQuestions = Subjects[subName];

  const handleSolve = (id) => {
    console.log("Solve", id);
  };

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="flex justify-center place-items-center v-screen h-screen">
          <Loader />
        </div>
      )}
      {questions && (
        <div className="flex flex-col items-center justify-center mt-8">
          {questions.map((questions) => {
            return (
              <div className="my-2 w-9/12">
                <Card sx={{ maxWidth: 1500 }}>
                  <div className="flex justify-between my-2">
                    <div>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {questions.qno}. {questions.question}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </div>
                    <div>
                      <CardActions>
                        <NavLink
                          to={`${questions.qno}`}
                          key={questions.qno}
                          state={{
                            question: questions,
                            subjectName: subName,
                          }}
                        >
                          <Button
                            variant="contained"
                            size="large"
                            key={questions.id}
                            onClick={() => handleSolve(questions.id)}
                          >
                            Solve
                          </Button>
                        </NavLink>
                      </CardActions>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Subject;
