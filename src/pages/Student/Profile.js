import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { styled } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Navbar from "./Navbar";

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  margin: "auto",
  marginBottom: theme.spacing(2),
  color: deepPurple[500].contrastText,
  backgroundColor: deepPurple[500],
}));

const ProfileCard = () => {
  const studentData = useSelector((state) => state?.studentProfile?.studentProfile);
  return (
    <>
      <Navbar />
      {!studentData && (
        <div className="flex justify-center place-items-center v-screen h-screen ">
          <Loader />
        </div>
      )}
      {studentData && (
        <div className="px-[20vh]">
          <Card
            sx={{
              fontFamily: "sans-serif",
              borderRadius: "16px",
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s ease-in-out",
              backgroundColor: "#797972"
            }}
          >
            <CardContent>
              <ProfileAvatar
                sx={{
                  fontSize: 24,
                }}
              >
                {studentData.name.charAt(0)}
              </ProfileAvatar>
              <Typography gutterBottom variant="h4" component="div">
                {studentData.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Email: {studentData.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                JNTU No: {studentData.jntu}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Department: {studentData.dept}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Section: {studentData.sec}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Batch: {studentData.batch}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {studentData.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gender: {studentData.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mobile: {studentData.mobile}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
