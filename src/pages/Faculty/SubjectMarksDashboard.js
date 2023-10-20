/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TableHead } from "@mui/material";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";
import ApiHeader from "../../components/APIHeader";
import DownloadFile from "../../components/DownloadFile";
import StudentDetails from "../../data/studentdetails.json";

export default function BasicTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentsMarks, setStudentMarks] = useState("");
  const [loading, setLoading] = useState(true)

  // console.log(StudentDetails, studentsMarks);
  console.log(props);
  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const response = await fetch(
        `/${props.semester}/${props.courseCode}/${props.section}/SubjectMarksDashboard`,
        {
          headers: ApiHeader,
        }
      );
      const data = await response.json();
      setStudentMarks(data.studentMarks);
      setLoading(false);
    }
    fetchData();
  }, [props.section]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - studentsMarks.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // let noOfExp = Object.keys(StudentDetails[0].expmarks).length;
  let noOfExp = 8;

  const headers = [
    { label: "S. No" },
    { label: "JNTU Number"},
    ...[...Array(noOfExp)].map((e, i) => {
      return { label: `Exp ${i + 1}` };
    }),
  ]
  return (
    <>
    
    {loading && (
        <div className="flex justify-center place-items-center v-screen h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {
        studentsMarks && (
          <>
          <div className="flex float-right my-[1vh]">
          <Button
              variant="contained"
              size="medium"
              key="download"
              sx={{
                color: "#fff",
                backgroundColor: "#3f51b5",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#3d5afe",
                },
              }}
            >
              <DownloadFile data={studentsMarks} headers={headers} filename="SubjectMarks.csv" />
            </Button>
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              minWidth: 650,
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              <TableRow sx={{
                backgroundColor: "#f5f5f5",
                color: "#000",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}>
                <TableCell className="">S. No</TableCell>
                <TableCell>JNTU Number</TableCell>
                {[...Array(noOfExp)].map((e, i) => {
                  return <TableCell>Exp&nbsp;{i + 1} </TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rowsPerPage > 0
                ? studentsMarks.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : */}
              {studentsMarks?.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ width: 140 }}>{row.jntu}</TableCell>
                  {[...Array(noOfExp)].map((e, i) => {
                    return <TableCell>{row?.marks[i]?.marks ? row?.marks[i].marks : 0}</TableCell>;
                  })}
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <Divider />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={StudentDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        </>)
      }
    </>
  );
}
