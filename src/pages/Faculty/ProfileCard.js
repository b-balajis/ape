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
  const facultyData = useSelector((state) => state.userData.userDetails);
  return (
    <>
    {!facultyData && (
        <div className="flex justify-center place-items-center v-screen h-screen ">
            <Loader />
        </div>
    )}
      {facultyData && (
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
          <CardContent>
            <ProfileAvatar sx={{
                fontSize: 24
            }}>{facultyData.name.charAt(0)}</ProfileAvatar>
            <Typography gutterBottom variant="h4" component="div">
              {facultyData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {facultyData.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Faculty ID: {facultyData.facultyId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Designation: {facultyData.designation}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mobile: {facultyData.mobile}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProfileCard;
