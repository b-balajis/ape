/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";

const Subjects = () => {
  const [subjectDetails, setSubjectDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const data = JSON.parse(localStorage.getItem("user"));
  const dept = data.dept;
  const batch = data.year;

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
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center place-items-center v-screen h-screen">
          <Loader />
        </div>
      )}
      <div className="mt-8">
        {subjectDetails && (
          <div className="flex items-center justify-center">
            {subjectDetails?.map((subject) => (
              <div className="flex flex-wrap text-center mr-4">
                <div className="border rounded-lg transform transition duration-500 hover:scale-110 mt-1">
                  <NavLink
                    to={`${subject.toLowerCase()}`}
                    key={subject}
                    state={{
                      subjectName: subject,
                    }}
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
                  }}
                >
                  <img
                    src={subject.image}
                    alt={subject.name}
                    className="rounded-xl h-40 w-64"
                  />
                </NavLink>
              </div>
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
