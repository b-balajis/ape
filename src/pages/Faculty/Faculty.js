/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Navbar from "./Navbar";
import ListofSubjects from "./ListofSubjects";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiresponse } from "../../store/modules/app/slices/app.slice";
import ProfileCard from "./ProfileCard";

const Faculty = () => {
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await fetch(`/fetchFaculty/${email}`);
        const facultyData = await response.json();
        if (!response.ok) {
          throw new Error(facultyData.message);
        }
        dispatch(apiresponse(facultyData));
        // fetchPresentSemData(batch);
        return facultyData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchStudentData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex justify-around mt-[10vh] px-[10vh] gap-4">
        <ProfileCard />
        <ListofSubjects />
      </div>
    </>
  );
};

export default Faculty;
