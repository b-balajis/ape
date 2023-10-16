/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent } from "@mui/material";
import { Typography } from "@mui/material/";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import images from "../../assets/img/languagesImages/languages";
import Loader from "../../components/Loader";
import { getStudentDashboard } from "../../store/modules/app/slices/studentDashboard.slice";
import { getStudent } from "../../store/modules/app/slices/studentProfile.slice";
import Navbar from "./Navbar";

const Student = () => {
  const [subjectDetails, setSubjectDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const studentDashboard = useSelector(
    (state) => state?.studentDashboard?.studentDashboard
  );

  useEffect(() => {
    if (studentDashboard?.completeData) {
      setSubjectDetails(studentDashboard?.completeData[0]);
      setIsLoading(false);
    }else if(studentDashboard?.error){
      setError(true);
    }
  }, [studentDashboard])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await dispatch(getStudent(email));

        if (studentData.payload) {
          // Check if specific values exist in localStorage
          const sem = localStorage.getItem("sem");
          const dept = localStorage.getItem("dept");
          const sec = localStorage.getItem("section");

          // Conditionally dispatch getStudentDashboard
          if (sem && dept && sec) {
            await dispatch(getStudentDashboard({ sem, dept, sec }))
          }
        }
      } catch (error) {
        console.log(error, "error");
        setError(true);
      }
    };

    fetchData();
  }, [email]);

  return (
    <>
      <Navbar />
      <div className="flex justify-around mt-[10vh]">
        <div className="mt-8">
          {subjectDetails && (
            <div className="flex items-center justify-center">
              {subjectDetails?.map((subject) => (
                <Card
                  sx={{
                    maxWidth: 400,
                    fontFamily: "sans-serif",
                    borderRadius: "16px",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <NavLink
                    to={`${subject.courseCode.toLowerCase()}`}
                    key={subject.courseCode}
                    state={{
                      subject: subject.subject,
                      courseCode: subject.courseCode,
                    }}
                  >
                    <CardContent
                      sx={{
                        fontFamily: "serif",
                      }}
                    >
                      <img
                        src={images[subject.language]}
                        alt="img"
                        width={400}
                      />
                      <p className="text-black text-2xl uppercase mt-[2vh] font-bold font-serif">
                        {subject.subject}
                      </p>
                      <p className="text-black text-xl mt-[1vh]">
                        Course Code : <b>{subject.courseCode}</b> Credits :
                        <b>{subject.credits}</b>
                      </p>
                      <p className="text-black text-xl mt-[1vh] mb-[1vh]">
                        Faculty : <b>{subject.faculty}</b>
                      </p>
                      <Typography
                        component="p"
                        variant="body1"
                        color="primary"
                        underline="hover"
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: "secondary.main",
                          },
                          textAlign: "center",
                        }}
                      >
                        Click here to open
                      </Typography>
                    </CardContent>
                  </NavLink>
                </Card>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center place-items-center v-screen">
              <Loader />
            </div>
          )}
          {error && (
            <div>
              <h1>Something went wrong</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Student;
