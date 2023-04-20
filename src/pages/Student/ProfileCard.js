import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { deepPurple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  margin: "auto",
  marginBottom: theme.spacing(2),
  color: deepPurple[500].contrastText,
  backgroundColor: deepPurple[500],
}));

const ProfileCard = () => {
  const studentData = useSelector((state) => state.userData.userDetails);
  return (
    <>
    {!studentData && (
        <div className="flex justify-center place-items-center v-screen h-screen ">
            <Loader />
        </div>
    )}
      {studentData && (
        <Card
          sx={{
            width: 1200,
            fontFamily: "sans-serif",
            borderRadius: "16px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardContent>
            <ProfileAvatar sx={{
                fontSize: 24
            }}>{studentData.name.charAt(0)}</ProfileAvatar>
            <Typography gutterBottom variant="h4" component="div">
              {studentData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Emaijjjl: {studentData.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              JNTU Number: {studentData.jntu}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dept: {studentData.dept}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Section: {studentData.sec}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Batch: {studentData.batch}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProfileCard;
