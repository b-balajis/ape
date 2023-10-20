/* eslint-disable react-hooks/exhaustive-deps */
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFacultyDashboard } from "../../store/modules/app/slices/facultyDashboard.slice";
import { getFaculty } from "../../store/modules/app/slices/facultyProfile.slice";
import Navbar from "./Navbar";

const Faculty = () => {
  const [facultyDashboard, setFacultyDashboard] = useState();
  const [loading, setLoading] = useState(true);
  const facultyHomePage = useSelector(
    (state) => state.facultyDashboard?.facultyDashboard
  );

  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  useEffect(() => {
    async function facultyDashboard() {
      const facultyData = await dispatch(getFaculty(email));

      if (facultyData.payload) {
        const facultyId = localStorage.getItem("facultyId");
        const dept = localStorage.getItem("dept");
        if (facultyId && dept) {
          await dispatch(getFacultyDashboard({ facultyId, dept }));
        }
      }
    }
    facultyDashboard();
  }, [dispatch, email]);

  useEffect(() => {
    setFacultyDashboard(facultyHomePage);
    if (facultyHomePage !== null) {
      setLoading(false);
    }
  }, [facultyHomePage]);
  return (
    <>
      <Navbar />
      {loading && (
        <div className="flex justify-center place-items-center v-screen h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className="flex justify-around mt-[10vh] px-[10vh] gap-4">
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          {facultyDashboard &&
            facultyDashboard.map((subject, i) => (
              <Card
              key={i}
                sx={{
                  maxWidth: 600,
                  fontFamily: "sans-serif",
                  borderRadius: "16px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    fontFamily: "serif",
                    width: "25vw",
                  }}
                >
                  <p className="text-black text-xl uppercase mt-[2vh] font-serif">
                    Semester: {subject.semester}
                  </p>
                  <p className="text-black text-xl uppercase mt-[2vh] font-serif">
                    Subject: <b>{subject.subject}</b>
                  </p>
                  <p className="text-black text-xl mt-[1vh]">
                    Course Code : <b>{subject.courseCode}</b>
                  </p>
                  <p className="text-black text-xl mt-[1vh]">
                    Section : <b>{subject.section}</b>
                  </p>
                  <Typography
                    component="p"
                    variant="body1"
                    color="primary"
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                      mt: "2vh",
                      "&:hover": {
                        color: "secondary.main",
                      },
                      textAlign: "center",
                    }}
                  >
                    {/* button from MUI*/}
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        borderRadius: "16px",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      endIcon={<LaunchRoundedIcon/>}
                    >
                      <NavLink
                        to={`${subject.courseCode.toLowerCase()}`}
                        // key={subject.courseCode}
                        state={{
                          subject: subject.subject,
                          courseCode: subject.courseCode,
                          semester: subject.semester,
                          sections: subject.section,
                        }}
                      >
                        View Details
                      </NavLink>
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Grid>
      </div>
    </>
  );
};

export default Faculty;
