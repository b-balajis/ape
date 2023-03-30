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
  
  useEffect(() => {
    async function fetchPresentSemData() {
      setIsLoading(true);
      const response = await fetch(
        `/${presentSem}/fetchpresentSemData`, {
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

export default ListOfSubjects;
