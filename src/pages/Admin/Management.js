/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import SemesterData from "./SemesterData";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import headers from "../../components/APIHeader";

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
  const [secondyear, setSecondYear] = useState([]);
  const [thirdyear, setThirdYear] = useState([]);
  const [fourthyear, setFourthYear] = useState([]);
  const [editSecondYear, setEditSecondYear] = useState(false);
  const [editThirdYear, setEditThirdYear] = useState(false);
  const [editFourthYear, setEditFourthYear] = useState(false);
  const [semesterPreview, setSemesterPreview] = useState("");
  const [secondYearBatch, setSecondYearBatch] = useState(dayjs("2022-04-07"));
  const [thirdYearBatch, setThirdYearBatch] = useState(dayjs("2022-04-07"));
  const [fourthYearBatch, setFourthYearBatch] = useState(dayjs("2022-04-07"));
  const [accessConfirmationDialog, setAccessConfirmationDialog] =
    useState(false);

  useEffect(() => {
    async function fetchRunningSems() {
      try {
        const presentSemData = await fetch(`/runningSems`,{
          headers: headers
        }
        );
        const semdata = await presentSemData.json();
        if (!presentSemData.ok) {
          throw new Error(semdata.message);
        }
        setSecondYear(semdata[0].secondYear.sem);
        setThirdYear(semdata[0].thirdYear.sem);
        setFourthYear(semdata[0].fourthYear.sem);
        // setSecondYearBatch(dayjs(semdata[0].secondYearBatch))
        setSecondYearBatch(semdata[0].secondYear.batch);
        setThirdYearBatch(semdata[0].thirdYear.batch);
        setFourthYearBatch(semdata[0].fourthYear.batch);
        console.log(secondYearBatch);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchRunningSems();
  }, []);

  const presentSems = {
    secondYear: "3rd Sem",
    thirdYear: "5th Sem",
    fourthYear: "7th Sem",
  };

  const handleChangeSecondYear = (event) => {
    const {
      target: { value },
    } = event;
    setSecondYear(typeof value === "string" ? value.split(",") : value);
  };

  const handleSecondYearEdit = () => {
    if (!editSecondYear) return setEditSecondYear(true);
    else setEditSecondYear(true);
    console.log(" wnd", secondyear, thirdyear, secondYearBatch);
    updateSemAndBatch("secondYear", secondyear, secondYearBatch);
    // setAccessConfirmationDialog(true);
  };

  const handleChangeThirdYear = (event) => {
    const {
      target: { value },
    } = event;
    setThirdYear(typeof value === "string" ? value.split(",") : value);
  };
  const handleThirdYearEdit = () => {
    if (!editThirdYear) return setEditThirdYear(true);
    else setEditThirdYear(true);
    // setAccessConfirmationDialog(true);
  };

  const handleChangeFourthYear = (event) => {
    const {
      target: { value },
    } = event;
    setFourthYear(typeof value === "string" ? value.split(",") : value);
  };
  const handleFourthYearEdit = () => {
    if (!editFourthYear) return setEditFourthYear(true);
    else setEditFourthYear(true);
    // setAccessConfirmationDialog(true);
  };

  const updateSemAndBatch = async (year, sem, batch) => {
    try{
      const res = await fetch(`/${year}/updateYear`,{
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          sem: sem,
          batch: batch,
        }),
      })
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message)
      }
      console.log(data);
    }catch(error){
      console.log(error);
    }
  }

  const handleUpdateSem = async () => {
    console.log("update");
    // const payload = [ dept, "4thyear", {
    //   sem: "3rd",
    //   batch: "fourthYearBatch"
    // }
    // ];
    handleClose();
  };

  const handleClose = () => {
    setAccessConfirmationDialog(false);
    setEditSecondYear(false);
    setEditThirdYear(false);
    setEditFourthYear(false);
  };

  const handleSemesterView = async (sem) => {
    setSemesterPreview(sem);
  };
  return (
    <>
      <Navbar />
      {accessConfirmationDialog && (
        <div>
          <Dialog
            open={accessConfirmationDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm with Your Password"}
            </DialogTitle>
            <div className="w-2/3 mx-auto">
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
              />
            </div>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpdateSem} autoFocus>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <div className="flex place-items-center justify-center v-screen mt-2">
        <div>
          <FormControl sx={{ m: 1, width: 300, gap: 1 }}>
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
              <MenuItem key={3} value="thirdSem">
                3rd Sem
              </MenuItem>
              <MenuItem key={4} value="fourthSem">
                4th Sem
              </MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  views={["year"]}
                  value={secondYearBatch}
                  disabled={editSecondYear ? false : true}
                  onChange={(newValue) => {
                    setSecondYearBatch(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </Stack>
            </LocalizationProvider>
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
          <FormControl sx={{ m: 1, width: 300, gap: 1 }}>
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
              <MenuItem key={3} value="fifthSem">
                5th Sem
              </MenuItem>
              <MenuItem key={4} value="sixthSem">
                6th Sem
              </MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  views={["year"]}
                  value={thirdYearBatch}
                  disabled={editThirdYear ? false : true}
                  onChange={(newValue) => {
                    setThirdYearBatch(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </Stack>
            </LocalizationProvider>
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
          <FormControl sx={{ m: 1, width: 300, gap: 1 }}>
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
              <MenuItem key={3} value="seventhSem">
                7th Sem
              </MenuItem>
              <MenuItem key={4} value="eighthSem">
                8th Sem
              </MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DatePicker
                  views={["year"]}
                  value={fourthYearBatch}
                  disabled={editFourthYear ? false : true}
                  onChange={(newValue) => {
                    setFourthYearBatch(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </Stack>
            </LocalizationProvider>
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
