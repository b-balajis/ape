/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
// import Python from "../../assets/img/python.jpg";
// import Java from "../../assets/img/Java.jpg";
// import CPP from "../../assets/img/cpp.jpg";
import { NavLink } from "react-router-dom";
import {  renderPresentSem, renderSubjects } from "../../api/AppFunctions";
// import Apicalling from "../../api/ApiCall";
import { useEffect, useState } from "react";


const Subjects = () => {

  const [subjectDetails, setSubjectDetails] = useState("");

  const data = JSON.parse(localStorage.getItem('userdata'));
  const dept = data.dept;
  const batch = data.year;

  // useEffect(async () => {
  //   const presentSem = await renderPresentSem(dept);
  //   const sem = presentSem.sem;
  //   const payload = [dept, sem];
  //   const subjects = await renderSubjects(payload);
  //   console.log(subjects);
  // })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const findsem = (currentsem) => {
    for (const key in currentsem) {
      if (Object.hasOwnProperty.call(currentsem, key)) {
        const element = currentsem[key].batch;
        if (element === batch) {
          const sem = currentsem[key].sem;
          return sem;
        }
        
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const presentSem = await renderPresentSem(dept);
      console.log(presentSem);
      const sem = findsem(presentSem)
      localStorage.setItem('sem', sem);
      const payload = [dept, sem];
      const subjects = await renderSubjects(payload);
      console.log(subjects);
      setSubjectDetails(subjects);
    }
    fetchData();
  }, [])

  console.log(subjectDetails);


  // const SubjectDetails = [
  //   {
  //     id: 1,
  //     name: "Python",
  //     image: Python,
  //   },
  //   {
  //     id: 2,
  //     name: "Java",
  //     image: Java,
  //   },
  //   {
  //     id: 3,
  //     name: "C++",
  //     image: CPP,
  //   },
  //   {
  //     id: 4,
  //     name: "C",
  //     image: CPP,
  //   }
  // ];


  return (
    <>
      <div className="mt-8">
        {subjectDetails && (
          <div className="flex items-center justify-center">
            {subjectDetails?.map((subject) => (
              <div className="flex flex-wrap text-center mr-4">
                <div className="border rounded-lg transform transition duration-500 hover:scale-110 mt-1">
                  <NavLink
                    to={`${subject.toLowerCase()}`}
                    key={subject}
                    state={
                      {
                        subjectName: subject,
                      }
                    }
                  >
                    <div className="bg-blue-400 w-48 h-48">
                      <p className="text-black text-3xl uppercase">{subject}</p>
                    </div>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      {/* <div className="flex items-center justify-center">
        {subjectDetails?.map((subject) => (
          <div className="flex flex-wrap text-center mr-4">
            <div className="border rounded-lg transform transition duration-500 hover:scale-110 mt-1">
              <NavLink
                to={`${subject.name.toLowerCase()}`}
                key={subject.name}
                state={
                  {
                    subjectName: subject.name,
                  }
                }
              >
                <img
                  src={subject.image}
                  alt={subject.name}
                  className="rounded-xl h-40 w-64"
                />
              </NavLink>
            </div>
          </div>
        ))}
      </div> */}
        {/* {loadedData?.map((subject) => (
          <p>{subject}</p>
        ))} */}
      </div>
    </>
  );
};

export default Subjects;
