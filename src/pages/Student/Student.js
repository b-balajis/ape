/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ListofSubjects from "./ListofSubjects";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiresponse } from "../../store/modules/app/slices/app.slice";
import headers from "../../components/APIHeader";

const Student = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await fetch(`/fetchStudent/${email}`, {
          method: 'GET',
          headers: headers
        });
        const studentData = await response.json();
        if (!response.ok) {
          throw new Error(studentData.message);
        }
        dispatch(apiresponse(studentData));
        const { batch, jntu, dept } = studentData;
        localStorage.setItem("jntu", jntu);
        localStorage.setItem("dept", dept);
        fetchPresentSemData(batch);
        return studentData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchStudentData();
  }, []);

  const fetchPresentSemData = async (batch) => {
    try {
      const presentSemData = await fetch(`/runningSems`,{
        method: 'GET',
        headers: headers
      })
      const semdata = await presentSemData.json();
      if (!presentSemData.ok) {
        throw new Error(semdata.message);
      }
      const currentsem = semdata[0];
      for (const key in currentsem) {
        if (Object.hasOwnProperty.call(currentsem, key)) {
          const element = currentsem[key].batch;
          if (element === batch) {
            const sem = currentsem[key].sem;
            localStorage.setItem("sem", sem);
          }
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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
