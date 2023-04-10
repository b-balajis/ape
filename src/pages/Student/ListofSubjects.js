/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import headers from "../../components/APIHeader";

const ListOfSubjects = () => {
  const [subjectDetails, setSubjectDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [presentSem, setPresentSem] = useState(null);
  // console.log(data);

  // const { org } = useSelector((state) => state.org.orgInfo);
  const presentSem = localStorage.getItem("sem");
  const dept = localStorage.getItem("dept");
  
  useEffect(() => {
    async function fetchPresentSemData() {
      setIsLoading(true);
      const response = await fetch(
        `/${presentSem}/${dept}/fetchSubjects`, {
          headers: headers
        }
      );
      const data = await response.json();
      console.log(data);
      setSubjectDetails(data);
      setIsLoading(false);
    }
    fetchPresentSemData();
  }, [presentSem])

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
                    to={`${subject.courseCode.toLowerCase()}`}
                    key={subject.courseCode}
                    state={{
                      subjectName: subject.courseCode,
                    }}
                  >
                    <div className="bg-blue-400 w-[20rem] h-48">
                      <p className="text-black text-3xl uppercase">{subject.subject}</p>
                    </div>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ListOfSubjects;
