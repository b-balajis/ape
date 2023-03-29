/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Subject = () => {
  const [questions, setQuestions] = useState("");
  const location = useLocation();
  const subName = location.state.subjectName;
  const sem = location.state.sem;
  console.log(subName, sem);

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch(`/${sem}/${subName}/fetchQuestions`);
      const data = await response.json();
      setQuestions(data);
      console.log(data);
    }
    fetchQuestions();
  }, []);

  const handleSolve = (id) => {
    console.log("Solve", id);
  };

  return (
    <>
      <Navbar />
      {questions && (
        <div className="flex flex-col items-center justify-center mt-8">
          {Object.values(questions)?.map((question) => {
            return (
              <div className="my-2 w-9/12">
                <Card sx={{ maxWidth: 1500 }}>
                  <div className="flex justify-between my-2">
                    <div>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {question.qno}. {question.question}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </div>
                    <div>
                      <CardActions>
                        <NavLink
                          to={`${question.qno}`}
                          key={question.qno}
                          state={{
                            question: question,
                            subjectName: subName,
                            sem: sem,
                          }}
                        >
                          <Button
                            variant="contained"
                            size="large"
                            key={question.id}
                            onClick={() => handleSolve(question.qno)}
                          >
                            View
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
