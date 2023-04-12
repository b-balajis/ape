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

const cardStyle = {
  width: 250,
  fontFamily: "sans-serif",
  borderRadius: "16px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const Subject = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("");
  const [studentMarks, setStudentMarks] = useState();

  const courseCode = useParams().courseCode;
  const location = useLocation();
  const subject = location.state.subject;
  const sem = localStorage.getItem("sem");
  const dept = localStorage.getItem("dept");
  const section = localStorage.getItem("sec");
  const jntu = localStorage.getItem("jntu");
  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      const response = await fetch(
        `/${sem}/${dept}/${courseCode.toUpperCase()}/${section}/${jntu}/fetchQuestionsAndMarks`
      );
      const data = await response.json();
      setQuestions(data.questions);
      setLanguage(data.language);
      setStudentMarks(data.marks);
      setIsLoading(false);
    }
    fetchQuestions();
  }, []);

  const handleSolve = (id) => {
    console.log("Solve", id);
  };

  const handleMerging = async () => {
    // Wait for questions state to update
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Merging questions and marks using id
    if (studentMarks === null) return 0;
    const mergedData = questions?.map((question) => {
      const marks = studentMarks?.marks.find(
        (mark) => mark.id === question.qno
      );
      if (marks === undefined) {
        return { ...question, marks: 0 };
      }
      return { ...question, ...marks };
    });
    setQuestions(mergedData);
  };

  useEffect(() => {
    handleMerging();
  }, [studentMarks]);

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-3xl text-center font-bold mt-8">
          {subject.toUpperCase()}
        </h1>
      </div>
      {isLoading && (
        <div className="flex justify-center place-items-center v-screen h-screen">
          <Loader />
        </div>
      )}
      <div className="flex justify-center place-items-center v-screen gap-x-6">
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div">
              Average :{" "}
              {studentMarks?.totalMarks?.average
                ? studentMarks.totalMarks.average
                : 0}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div">
              Augumented :{" "}
              {studentMarks?.totalMarks?.augmented
                ? studentMarks.totalMarks.augmented
                : 0}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div">
              Internal :{" "}
              {studentMarks?.totalMarks?.internal
                ? studentMarks.totalMarks.internal
                : 0}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div">
              External :{" "}
              {studentMarks?.totalMarks?.external
                ? studentMarks.totalMarks.external
                : 0}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div">
              Total :{" "}
              {studentMarks?.totalMarks?.total
                ? studentMarks.totalMarks.total
                : 0}
            </Typography>
          </CardContent>
        </Card>
      </div>

      {questions && (
        <div className="flex flex-col items-center justify-center mt-8">
          {Object.values(questions)?.map((question) => {
            return (
              <div className="my-2 w-9/12" key={question.qno}>
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
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <p className="text-lg text-orange-700">
                          Marks : {question.marks ? question.marks : 0}/15
                        </p>
                        <NavLink
                          to={`${question.qno}`}
                          key={question.qno}
                          state={{
                            question: question,
                            subjectName: courseCode,
                            language: language,
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
