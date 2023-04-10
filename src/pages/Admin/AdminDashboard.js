import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import headers from "../../components/APIHeader";
import { Card, Container, Grid } from "@mui/material";
import semesterJson from "../../data/sem.json";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchAdminDashboard() {
      const res = await fetch("/fetchSemWiseData", {
        headers: headers,
        method: "GET",
      });
      const data = await res.json();
      setDashboardData(data);
      setIsLoading(false);
    }
    fetchAdminDashboard();
  }, []);

  const handleDisplaySem = (sem) => {
    const semData = semesterJson.find((data) => data.value === sem);
    return semData.sem;
  };
  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="flex justify-center place-items-center v-screen h-screen">
          <Loader />
        </div>
      )}
      {dashboardData && (
        <Container
          maxWidth="xl"
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {dashboardData?.map((data) => {
            return (
              <Card
                key={data.id}
                sx={{
                  width: 700,
                  minHeight: 200,
                }}
              >
                <h1 className="text-center text-2xl font-serif font-bold">
                  {handleDisplaySem(data.semester)}
                </h1>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={3}>
                    <h1 className="text-center text-lg font-serif font-semibold">
                      Course Code
                    </h1>
                  </Grid>
                  <Grid item xs={6}>
                    <h1 className="text-center text-lg font-serif font-semibold">
                      Course
                    </h1>
                  </Grid>
                  <Grid item xs={3}>
                    <h1 className="text-center text-lg font-serif font-semibold">
                      Credits
                    </h1>
                  </Grid>
                </Grid>
                {data?.listofsubjects?.map((subject, index) => {
                  return (
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <Grid item xs={3}>
                        <h1 className="text-center text-lg font-serif">
                          {subject.courseId}
                        </h1>
                      </Grid>
                      <Grid item xs={6}>
                        <h1 className="text-left text-lg font-serif">
                          {subject.subject}
                        </h1>
                      </Grid>
                      <Grid item xs={3}>
                        <h1 className="text-center text-lg font-serif">
                          {subject.credits}
                        </h1>
                      </Grid>
                    </Grid>
                  );
                })}
              </Card>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default AdminDashboard;
