import { Route, Routes, Navigate } from "react-router-dom";

// Tailwind CSS Style Sheet
import "./App.css";
import SignIn from "./pages/SignIn";
import AdminHome from "./pages/Admin";
import StudentHome from "./pages/Student";
import FacultyHome from "./pages/Faculty";
import { AppProvider } from "./context/AppContext";
import Subject from "./pages/Faculty/Subject";
import StudentSubject from "./pages/Student/Subject";
import Profile from "./pages/Student/Profile";
import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddStudent from "./pages/Admin/AddStudent";
import AddFaculty from "./pages/Admin/AddFaculty";
import AddSubject from "./pages/Admin/AddSubject";
import Home from "./page/Home";
import AddQuestion from "./pages/Faculty/AddQuestion";
import Management from "./pages/Admin/Management";
import QuesionView from "./pages/Faculty/QuestionView";
import OTP from "./pages/Faculty/OTP";

function App() {
  return (
    <>
      <AppProvider>
        <main>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/*" element={<Navigate to="/signin" />} />
            <Route path="/a" element={<AdminHome />} />
            <Route path="/a/dashboard" element={<AdminDashboard />} />
            <Route path="/a/addstudent" element={<AddStudent />} />
            <Route path="/a/addfaculty" element={<AddFaculty />} />
            <Route path="/a/addsubject" element={<AddSubject />} />
            <Route path="/a/manage" element={<Management />} />
            <Route path="/f" element={<FacultyHome />} />
            <Route path="/f/:courseCode" element={<Subject />} />
            <Route path="/f/:courseCode/:question" element={<QuesionView />} />
            <Route path="/f/dashboard" element={<FacultyDashboard />} />
            <Route path="/f/addquestion" element={<AddQuestion />} />
            <Route path="/f/otp" element={<OTP />} />
            <Route path="/s" element={<StudentHome />} />
            <Route path="/s/profile" element={<Profile />} />
            <Route path="/s/:courseCode" element={<StudentSubject />} />
            <Route path="/s/:courseCode/:question" element={<Home />} />
          </Routes>
        </main>
      </AppProvider>
    </>
  );
}

export default App;
