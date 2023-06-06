import ProgrammingEditor from "../components/ProgrammingEditor";
import WebD from "../components/WebD";
import { useEditor } from "../context/AppContext";
import Navbar from "../pages/Student/Navbar";

const Home = () => {
  const { language } = useEditor() || {};
  return (
    <>
      {/* <div className="sticky top-0">
        <Navbar />
      </div> */}
    <div
      // style={{
      //   backgroundColor: "#111827",
      // }}
    >
      {/* making navbar as sticky */}
      {language === "webd" ? <WebD /> : <ProgrammingEditor />}
    </div>
    </>
  );
};

export default Home;
