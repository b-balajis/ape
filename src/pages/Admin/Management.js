/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState,useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import SemesterData from "./SemesterData";
import { renderAllPresentSemesters } from "../../api/AppFunctions";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Mangement = () => {
  const [secondyear, setSecondYear] = useState("");
  const [thirdyear, setThirdYear] = useState([]);
  const [fourthyear, setFourthYear] = useState([]);
  const [editSecondYear, setEditSecondYear] = useState(false);
  const [editThirdYear, setEditThirdYear] = useState(false);
  const [editFourthYear, setEditFourthYear] = useState(false);
  const [semesterPreview, setSemesterPreview] = useState("");

  const presentSems = {
    secondYear: "3rd Sem",
    thirdYear: "5th Sem",
    fourthYear: "7th Sem",
  }

  const data = JSON.parse(localStorage.getItem("userdata"));
  const payload = [data.dept]

  useEffect(() => {
    const fetchSemesters = async () => {
      const semesters = await renderAllPresentSemesters(payload);
      setSecondYear(semesters["2ndyear"].sem);
      setThirdYear(semesters["3rdyear"].sem);
      setFourthYear(semesters["4thyear"].sem);
      // setThirdYear(semesters.thirdYear);
      // setFourthYear(semesters.fourthYear);
      // const two = semesters["2ndyear"].sem
      // console.log(two);
      // setSecondYear(two);
    }
    fetchSemesters();
  }, [])
  console.log(secondyear, "jhhhhhh");

  const handleChangeSecondYear = (event) => {
    const {
      target: { value },
    } = event;
    setSecondYear(typeof value === "string" ? value.split(",") : value);
  };

  const handleSecondYearEdit = () => {
    if (editSecondYear) {
      setEditSecondYear(false);
    } else {
      setEditSecondYear(true);
    }
  };

  const handleChangeThirdYear = (event) => {
    const {
      target: { value },
    } = event;
    setThirdYear(typeof value === "string" ? value.split(",") : value);
  };
  const handleThirdYearEdit = () => {
    if (editThirdYear) {
      setEditThirdYear(false);
    } else {
      setEditThirdYear(true);
    }
  };

  const handleChangeFourthYear = (event) => {
    const {
      target: { value },
    } = event;
    setFourthYear(typeof value === "string" ? value.split(",") : value);
  };
  const handleFourthYearEdit = () => {
    if (editFourthYear) {
      setEditFourthYear(false);
    } else {
      setEditFourthYear(true);
    }
  };

  const handleSemesterView = async (sem) => {
    setSemesterPreview(sem);
  };

  return (
    <>
      <Navbar />
      <div className="flex place-items-center justify-center v-screen mt-2">
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">2nd Year</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={secondyear}
              onChange={handleChangeSecondYear}
              input={<OutlinedInput label="Semester" />}
              MenuProps={MenuProps}
              disabled={editSecondYear ? false : true}
            >
              <MenuItem key={3} value="3rdsem">
                3rd Sem
              </MenuItem>
              <MenuItem key={4} value="4thsem">
                4th Sem
              </MenuItem>
            </Select>
            <div className="flex mt-2 gap-3">
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSemesterView(presentSems.secondYear)}
              >
                View
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleSecondYearEdit}
              >
                {editSecondYear ? "Submit" : "Edit"}
              </Button>
            </div>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">3rd Year</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={thirdyear}
              onChange={handleChangeThirdYear}
              input={<OutlinedInput label="Semester" />}
              MenuProps={MenuProps}
              disabled={editThirdYear ? false : true}
            >
              <MenuItem key={3} value="5thsem">
                5th Sem
              </MenuItem>
              <MenuItem key={4} value="6thsem">
                6th Sem
              </MenuItem>
            </Select>
            <div className="flex mt-2 gap-3">
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSemesterView(presentSems.thirdYear)}
              >
                View
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleThirdYearEdit}
              >
                {editThirdYear ? "Submit" : "Edit"}
              </Button>
            </div>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">4th Year</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={fourthyear}
              onChange={handleChangeFourthYear}
              input={<OutlinedInput label="Semester" />}
              MenuProps={MenuProps}
              disabled={editFourthYear ? false : true}
            >
              <MenuItem key={3} value="7thsem">
                7th Sem
              </MenuItem>
              <MenuItem key={4} value="8thsem">
                8th Sem
              </MenuItem>
            </Select>
            <div className="flex mt-2 gap-3">
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSemesterView(presentSems.fourthYear)}
              >
                View
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleFourthYearEdit}
              >
                {editFourthYear ? "Submit" : "Edit"}
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
      {semesterPreview && <SemesterData semester={semesterPreview} />}
    </>
  );
};

export default Mangement;
