import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Toolbar from "@mui/material/Toolbar";
import * as Api from "../services/Api";
import {
  Paper,
  TableContainer,
  Container,
  Typography,
  Button,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

const mdTheme = createTheme();

const UserDetails = (props: any) => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const init = async () => {
      const [error, response] = await Api.getUserByID(props?.userID);
      if (error) {
        console.log(error);
      }
      setUser(response?.data);
    };
    init();
  }, []);

  return (
    <>
      <Typography variant="subtitle2" sx={{ fontSize: "medium" }}>
        {" "}
        {user?.username}{" "}
      </Typography>
    </>
  );
};

const Billings = () => {
  const [loading, setLoading] = useState<any>(false);
  const [billings, setBillings] = useState<any>();
  console.log("TCL: Billings -> ", billings);

  const getBillings = async () => {
    const [err, res] = await Api.getBillings();
    if (res) {
      console.log(res);
      setBillings(res?.data?.billings);
    }
  };
  useEffect(() => {
    const init = async () => {
      await getBillings();
    };
    init();
  }, []);

  const depositMoney = async(userID: any, amount: string, billingId: string) => {
    const [error,response] =await Api.depositAmount(userID,amount,billingId)
    if(response){
      alert("Money deposited to user account")
      await getBillings()
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Navbar title="User Billings" />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            maxWidth="lg"
            sx={{
              mt: 4,
              mb: 4,
            }}
          >
            {loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Billing Id</TableCell>
                      <TableCell>Payment Status</TableCell>
                      <TableCell>Transaction Id</TableCell>
                      <TableCell>Cutomer</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Amount (Deposit to user wallet)</TableCell>
                      <TableCell>Paid by Admin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {billings?.length > 0 &&
                      billings.map((row: any) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            cursor: "pointer",
                          }}
                        >
                          <TableCell>
                            {moment(row?.createdAt).format("DD-MM-YYYY,h:mm a")}
                          </TableCell>
                          <TableCell>{row?._id}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => window.open(row?.statusUrl)}
                            >
                              Payment status
                            </Button>
                          </TableCell>
                          <TableCell>{row?.txId}</TableCell>
                          <TableCell>
                            <UserDetails
                              merchant={row}
                              userID={row?.createdBy}
                            />
                          </TableCell>
                          <TableCell>
                            {row?.payWith} {row?.amount}
                          </TableCell>
                          <TableCell>
                            ${row?.amountDepositTowallet}
                          </TableCell>
                          <TableCell>{row?.paidByAdmin.toString()}</TableCell>
                          {row?.paidByAdmin.toString() === "true" ? (
                            <></>
                          ) : (
                            <TableCell sx={{ cursor: "pointer" }}>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  depositMoney(
                                    row?.createdBy,
                                    row?.amountDepositTowallet,
                                    row?._id
                                  )
                                }
                              >
                                Deposit Amount
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Billings;
