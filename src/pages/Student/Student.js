/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import headers from "../../components/APIHeader";
import { profileData } from "../../store/modules/app/slices/profile.slice";
import ListofSubjects from "./ListofSubjects";
import Navbar from "./Navbar";

const Student = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await fetch(`/fetchStudent/${email}`, {
          method: "GET",
          headers: headers,
        });
        const studentData = await response.json();
        if (!response.ok) {
          throw new Error(studentData.message);
        }
        dispatch(profileData(studentData));
        const { presentSem, jntu, dept, sec } = studentData;
        localStorage.setItem("jntu", jntu);
        localStorage.setItem("dept", dept);
        localStorage.setItem("sec", sec);
        localStorage.setItem("sem", presentSem);
        return studentData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchStudentData();
  }, );

  return (
    <>
      <Navbar />
      <div className="flex justify-around mt-[10vh]">
        <ListofSubjects />
      </div>
    </>
  );
};

export default Student;
