import { Navigate, Route, Routes } from "react-router-dom";

// Tailwind CSS Style Sheet
import "./App.css";
import LogOut from "./components/Logout";
import MCQs from "./components/MCQs";
import { AppProvider } from "./context/AppContext";
import Home from "./page/Home";
import AdminHome from "./pages/Admin";
import AddFaculty from "./pages/Admin/AddFaculty";
import AddStudent from "./pages/Admin/AddStudent";
import AddSubject from "./pages/Admin/AddSubject";
import Management from "./pages/Admin/Management";
import FacultyHome from "./pages/Faculty";
import AddQuestion from "./pages/Faculty/AddQuestion";
import OTP from "./pages/Faculty/OTP";
import QuesionView from "./pages/Faculty/QuestionView";
import Subject from "./pages/Faculty/Subject";
import SubjectMarksDashboard from "./pages/Faculty/SubjectMarksDashboard";
import SignIn from "./pages/SignIn";
import StudentHome from "./pages/Student";
import Profile from "./pages/Student/Profile";
import StudentSubject from "./pages/Student/Subject";

function App() {
  return (
    <>
      <AppProvider>
        <main>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/*" element={<Navigate to="/signin" />} />
            <Route path="/a" element={<AdminHome />} />
            <Route path="/a/addstudent" element={<AddStudent />} />
            <Route path="/a/addfaculty" element={<AddFaculty />} />
            <Route path="/a/addsubject" element={<AddSubject />} />
            <Route path="/a/manage" element={<Management />} />
            <Route path="/f" element={<FacultyHome />} />
            <Route path="/f/:courseCode" element={<Subject />} />
            <Route path="/f/:courseCode/:question" element={<QuesionView />} />
            <Route path="/f/dashboard" element={<SubjectMarksDashboard />} />
            <Route path="/f/addquestion" element={<AddQuestion />} />
            <Route path="/f/otp" element={<OTP />} />
            <Route path="/s" element={<StudentHome />} />
            <Route path="/s/profile" element={<Profile />} />
            <Route path="/s/:courseCode" element={<StudentSubject />} />
            <Route path="/s/:courseCode/:question" element={<Home />} />
            <Route path="/s/mcq" element={<MCQs />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </main>
      </AppProvider>
    </>
  );
}

export default App;
