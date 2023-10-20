/* eslint-disable react-hooks/exhaustive-deps */ import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CardActionArea,
  CardActions,
  Container,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import DownArrowIcon from "../../assets/icons/down-arrow.svg";
import UpArrowIcon from "../../assets/icons/up-arrow.svg";
import AddQuestion from "./AddQuestion";
import Navbar from "./Navbar";
import SubjectMarksDashboard from "./SubjectMarksDashboard";

const Subject = () => {
  const location = useLocation();
  if (location.state === null) {
    window.location.href = "/f";
  }
  const { courseCode, subject, semester, sections } = location.state;
  const [questions, setQuestions] = useState("");
  const [displayDashboard, setDisplayDashboard] = useState(false);
  const [section, setSection] = useState(sections[0]);
  const [addQuestion, setAddQuestion] = useState(false);
  const sectionsArray = sections.split(",").map((section) => section.trim());

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch(`/${semester}/${courseCode}/fetchQuestions`);
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
        {Object.values(questions)?.map((question, i) => {
          return (
            <div className="my-2 w-full" key={i}>
              <Card sx={{ maxWidth: 1500, borderRadius: "9px" }}>
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
                        // key={question.qno}
                        state={{
                          question: question,
                          subject: subject,
                          sem: semester,
                          courseCode: courseCode,
                        }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          // key={question.id}
                          onClick={() => handleSolve(question.qno)}
                          sx={{
                            mr: "1vw",
                          }}
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

  const handleOnclickDisplay = () => {
    if(addQuestion){
      return
    }
    return setDisplayDashboard(!displayDashboard)
  }

  return (
    <>
      <Navbar />
      {/* creating a card component background color related to questions */}
      <Container maxWidth="xl">
        <div className="text-left mt-8 flex items-center">
          <Card
            onClick={() => handleOnclickDisplay()}
            sx={{
              width: 180,
              height: 50,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "#90F7EC",
              borderRadius: 4,
              transition: "transform 0.3s ease-in-out",
              cursor: addQuestion ? "not-allowed" : "pointer",
            }}
          >
            <div className="flex justify-center space-x-3 mt-2">
              <p className="text-center text-xl font-bold">
                {displayDashboard ? "Dashboard" : "Questions"}
              </p>
              <img
                src={displayDashboard ? DownArrowIcon : UpArrowIcon}
                alt="Arrow"
                width={30}
              />
            </div>
          </Card>
          <div className="flex-1 text-center font-serif font-bold text-4xl">
            {subject}
          </div>
          {displayDashboard && (
            <div>
              <FormControl
                sx={{ m: 1, minWidth: "12vh", backgroundColor: "#fff  " }}
                size="small"
              >
                <InputLabel id="demo-simple-select-label">Section</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={section}
                  label="Section"
                  onChange={(e) => setSection(e.target.value)}
                  disabled={!displayDashboard}
                >
                  {sectionsArray.map((sec, i) => (
                    <MenuItem value={sec}>{sec}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          {!displayDashboard && (
            <FormControl
              sx={{ m: 1, minWidth: "12vh", backgroundColor: "#fff  " }}
              size="small"
            >
              <Button
                color={addQuestion ? "error" : "primary"}
                variant="contained"
                size="large"
                startIcon={addQuestion ? <CloseIcon /> : <AddIcon />}
                onClick={() => setAddQuestion(!addQuestion)}
              >
                {addQuestion ? "Cancel Question" : "Add Question"}
              </Button>
            </FormControl>
          )}
        </div>

        {!displayDashboard && !addQuestion && renderQuestions()}
        {addQuestion && (
          <AddQuestion
            courseCode={courseCode}
            semester={semester}
            section={section}
            subject={subject}
          />
        )}
        {displayDashboard && (
          <SubjectMarksDashboard
            courseCode={courseCode}
            semester={semester}
            section={section}
          />
        )}
      </Container>
    </>
  );
};

export default Subject;
