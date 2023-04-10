/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
// import Subjects from "../../data/Subjects.json";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Subject = () => {
  const [questions, setQuestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("");

  const subName = useParams().subjectName;
  const sem = localStorage.getItem("sem");
  const dept = localStorage.getItem("dept")
  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      const response = await fetch(`/${sem}/${dept}/${subName.toUpperCase()}/fetchQuestions`);
      const data = await response.json();
      setQuestions(data.questions);
      setLanguage(data.language);
      setIsLoading(false);
    }
    fetchQuestions();
  }, []);

  const handleSolve = (id) => {
    console.log("Solve", id);
  };

  console.log(language);

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
                            language: language
                          }}
                        >
                          <Button
                            variant="contained"
                            size="large"
                            key={question.id}
                            onClick={() => handleSolve(question.id)}
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
