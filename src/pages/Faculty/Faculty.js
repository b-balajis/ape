import React from 'react';
import Navbar from "./Navbar"
import ListofSubjects from "./ListofSubjects"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiresponse } from "../../store/modules/app/slices/app.slice";
import ProfileCard from './ProfileCard';

const Faculty = () => {
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await fetch(`/fetchFaculty/${email}`);
        const studentData = await response.json();
        if (!response.ok) {
          throw new Error(studentData.message);
        }
        dispatch(apiresponse(studentData));
        const { batch, jntu } = studentData;
        localStorage.setItem("jntu", jntu);
        // fetchPresentSemData(batch);
        return studentData;
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
   <div className='flex justify-around mt-[10vh]'>
   <ProfileCard />
    <ListofSubjects />
   </div>
    </>
  )
}

export default Faculty;
