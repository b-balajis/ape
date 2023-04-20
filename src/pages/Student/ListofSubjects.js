/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import headers from "../../components/APIHeader";
import { Card, CardContent } from "@mui/material";
import images from "../../assets/img/languagesImages/languages";
import { Typography } from "@mui/material/";
import { useSelector } from "react-redux";

const ListOfSubjects = () => {
  const [subjectDetails, setSubjectDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [presentSem, setPresentSem] = useState(null);
  // console.log(data);

  const userData = useSelector((state) => state?.userData?.userDetails);
  console.log(userData);
  const presentSem = localStorage.getItem("sem");
  const dept = localStorage.getItem("dept");
  const courseCode = "21BEX08";
  const section = "A";

  useEffect(() => {
    async function fetchPresentSemData() {
      setIsLoading(true);
      const response = await fetch(
        `/${presentSem}/${dept}/${courseCode}/${section}/fetchFacultyAndSubjects`,
        {
          headers: headers,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        setError(true);
        setIsLoading(false)
        throw new Error(data.message);
      }
      setSubjectDetails(data.mergedData);
      setIsLoading(false);
    }
    fetchPresentSemData();
  }, [presentSem]);

  return (
    <>
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
                    <img src={images[subject.language]} alt="img" width={400} />
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
    </>
  );
};

export default ListOfSubjects;
