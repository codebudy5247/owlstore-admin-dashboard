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

const mdTheme = createTheme();

const Withdrawals = () => {
  const [loading, setLoading] = useState<any>(false);
  const [withdrawals, setWithdrawals] = useState<any>();

  const get_withdrawals = async () => {
    const [err, res] = await Api.getWithdrawals();
    if (res) {
      console.log(res);
      setWithdrawals(res?.data);
    }
  };
  useEffect(() => {
    const init = async () => {
      await get_withdrawals();
    };
    init();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Navbar title="Withdrawal Requests" />
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
                      <TableCell>Order Id</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Seller</TableCell>
                      <TableCell>Payment Address</TableCell>
                      <TableCell>Paid by Admin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {withdrawals?.length > 0 &&
                      withdrawals.map((row: any) => (
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
                          <TableCell>{row?.amount}</TableCell>
                          <TableCell>
                            <UserDetails
                              merchant={row}
                              userID={row?.createdBy}
                            />
                          </TableCell>
                          <TableCell>{row?.paymentAddress}</TableCell>
                          <TableCell>{row?.paidByAdmin.toString()}</TableCell>
                          
                          {/* <TableCell>{row?.paidByAdmin.toString()}</TableCell>
                          {row?.paidByAdmin.toString() === "true" ? (
                            <></>
                          ) : (
                            <TableCell sx={{ cursor: "pointer" }}>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  depositMoney(
                                    row?.createdBy,
                                    row?.amount,
                                    row?._id
                                  )
                                }
                              >
                                Deposit Amount
                              </Button>
                            </TableCell>
                          )} */}
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

export default Withdrawals;
