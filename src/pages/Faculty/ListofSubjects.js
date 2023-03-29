import { useEffect, useState } from "react";
import { Grid, Paper, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const FacutlySubjects = () => {
  const [facultyDashboard, setFacultyDashboard] = useState(null);
  const name = "Dr. P. Kanchanamala";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/${name}/facultydashboard`);
      const data = await response.json();
      setFacultyDashboard(data);
    }
    fetchData();
  }, []);

  if (!facultyDashboard) {
    return <p>Loading...</p>;
  }

  const { allotment } = facultyDashboard;

  return (
    <Grid container spacing={4}>
      {Object.entries(allotment).map(([semester, subjects]) => (
        <Grid item xs={12} key={semester}>
          <Typography variant="h5">
            Semester: {semester.toLocaleUpperCase()}
          </Typography>
          <Grid container spacing={4}>
            {Object.entries(subjects).map(([subject, details]) => (
              <Grid item xs={12} md={6} lg={4} key={subject}>
                <NavLink
                  to={`${subject.toLowerCase()}`}
                  key={subject}
                  state={{
                    subjectName: subject,
                    sem: semester
                  }}
                >
                  <StyledPaper>
                    <Typography variant="h6">
                      Subject Name: {subject}
                    </Typography>
                    <Typography>Section Name: {details.section}</Typography>
                    <Typography>Department: {details.dept}</Typography>
                  </StyledPaper>
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default FacutlySubjects;
