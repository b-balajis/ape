import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import headers from "../../components/APIHeader";
import { useSelector } from "react-redux";

const FacutlySubjects = () => {
  const [facultyDashboard, setFacultyDashboard] = useState();
  const facultyData = useSelector((state) => state.userData.userDetails);

  console.log(facultyData, "data");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/${facultyData.facultyId}/${facultyData.dept}/facultydashboard`,
        {
          headers: headers,
        }
      );
      const data = await response.json();
      setFacultyDashboard(data);
    }
    fetchData();
  }, [facultyData]);

  return (
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
        facultyDashboard.map((subject) => (
          <Card
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
                <p className="text-black text-xl uppercase mt-[2vh] font-serif">
                  Semester: {subject.semester}
                </p>
                <p className="text-black text-xl uppercase mt-[2vh] font-serif">
                  Subject: <b>{subject.subject}</b>
                </p>
                <p className="text-black text-xl mt-[1vh]">
                  Course Code : <b>{subject.courseCode}</b>
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
    </Grid>
  );
};

export default FacutlySubjects;
