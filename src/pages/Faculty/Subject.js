/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Container } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import DownArrowIcon from "../../assets/icons/down-arrow.svg";
import UpArrowIcon from "../../assets/icons/up-arrow.svg";

const Subject = () => {
  const [questions, setQuestions] = useState("");
  const [displayDashboard, setDisplayDashboard] = useState(false);
  const location = useLocation();
  const { courseCode, subject } = location.state;
  // const dept = localStorage.getItem("dept");
  const sem = localStorage.getItem("sem");

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch(
        `/${sem}/${courseCode}/fetchQuestions`
      );
      const data = await response.json();
      setQuestions(data.questions);
    }
    fetchQuestions();
  }, []);

  const handleSolve = (id) => {
    console.log("Solve", id);
  };

  const renderQuestions = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-4">
        {Object.values(questions)?.map((question) => {
          return (
            <div className="my-2 w-full">
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
                          subject: subject,
                          sem: sem,
                          courseCode: courseCode,
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
    );
  };

  const renderDashboard = () => {
    return(
      <div>
        Student Dashboard
      </div>
    )
  }

  const handleQuestions = () => {
    setDisplayDashboard(false);
    console.log("Questions");
  };

  const handleDashboard = () => {
    setDisplayDashboard(true);
    console.log("Dashboard");
  };

  return (
    <>
      <Navbar />
      {/* creating a card component background color related to questions */}
      <Container maxWidth="xl">
        <div className="flex items-center justify-between mt-8">
          <Card
            onClick={handleQuestions}
            sx={{
              opacity:
                displayDashboard === false
                  ? "1"
                  : "0.5",
              width: 180,
              height: 50,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "#90F7EC",
              borderRadius: 4,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                opacity: 1
              }
            }}
          >
            <div className="flex justify-center mt-[1vh] space-x-3">
              <p className="text-center text-xl font-bold">Questions</p>
              <img
                src={displayDashboard ? DownArrowIcon : UpArrowIcon}
                alt="Arrow"
                width={30}
              />
            </div>
          </Card>
          <p className="text-4xl font-serif font-bold">{subject}</p>
          <Card
            onClick={handleDashboard}
            sx={{
              opacity:
                displayDashboard === true
                  ? "1"
                  : "0.5",
              width: 180,
              height: 50,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "#90F7EC",
              borderRadius: 4,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                opacity: 1
              },
            }}
          >
            <div className="flex justify-center mt-[1vh] space-x-3">
              <p className="text-center text-xl font-bold">Dashboard</p>
              <img
                src={displayDashboard ? UpArrowIcon : DownArrowIcon}
                alt="Arrow"
                width={30}
              />
            </div>
          </Card>
        </div>
        {!displayDashboard && renderQuestions()}
        {displayDashboard && renderDashboard()}
      </Container>
    </>
  );
};

export default Subject;
