import { useEffect } from "react";
import Python from "../../assets/img/python.jpg";
import Java from "../../assets/img/Java.jpg";
import CPP from "../../assets/img/cpp.jpg";
import { NavLink, useLocation } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { renderSUbjects } from "../../api";

const Subjects = () => {
  const { sendRequest, status, data: loadedData, error } = useHttp(
    renderSUbjects,
    true
  )

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userdata'));
    const dept = data.dept;
    sendRequest(dept);
  }, [sendRequest]);

  console.log(loadedData, status, error);

  // const { type } = useParams();

  const location = useLocation();
  console.log("subjects", location);


  const SubjectDetails = [
    {
      id: 1,
      name: "Python",
      image: Python,
    },
    {
      id: 2,
      name: "Java",
      image: Java,
    },
    {
      id: 3,
      name: "C++",
      image: CPP,
    },
    {
      id: 4,
      name: "C",
      image: CPP,
    }
  ];


  return (
    <>
      <div className="mt-8">
      <div className="flex items-center justify-center">
        {SubjectDetails?.map((subject) => (
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
      </div>
        {loadedData?.map((subject) => (
          <p>{subject}</p>
        ))}
      </div>
    </>
  );
};

export default Subjects;
