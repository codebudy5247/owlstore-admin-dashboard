import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../components/Navbar";
import {
  Paper,
  TableContainer,
  Container,
  Typography,
  Button,
} from "@mui/material";
import * as Api from "../services/Api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { Icon } from "@iconify/react";
import OrderDetailsModel from "../components/OrderDetailsModel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateOrderModel from "../components/UpdateOrderModel";

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

const Orders = () => {
  const [orders, setOrders] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [orderDetail, setOrderDetail] = useState<any>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const handleOpenUpdateModel = () => setOpenUpdateModel(true);
  const handleCloseUpdateModel = () => setOpenUpdateModel(false);

  const getOrders = async () => {
    const [err, res] = await Api.getOrders();
    if (res) {
      console.log(res);
      setOrders(res?.data?.orders);
    }
  };
  useEffect(() => {
    const init = async () => {
      await getOrders();
    };
    init();
  }, []);

  const orderDetails = (order: any) => {
    handleOpen();
    setOrderDetail(order);
  };
  
  const deleteOrder = (orderId:any) =>{
      
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Navbar title="Orders" />
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
                      <TableCell>status</TableCell>
                      <TableCell>Cutomer</TableCell>
                      <TableCell>Seller</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Payment Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders?.length > 0 &&
                      orders.map((row: any) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            cursor: "pointer",
                          }}
                          onClick={() => orderDetails(row)}
                        >
                          <TableCell>
                            {moment(row?.createdAt).format("DD-MM-YYYY,h:mm a")}
                          </TableCell>
                          <TableCell>{row?._id}</TableCell>
                          <TableCell>{row?.status}</TableCell>
                          <TableCell>
                            <UserDetails merchant={row} userID={row?.user} />
                          </TableCell>
                          <TableCell>
                            <UserDetails merchant={row} userID={row?.seller} />
                          </TableCell>
                          <TableCell>฿ {row?.totalPrice}</TableCell>
                          <TableCell sx={{}}>
                            <Box sx={{ display: "flex" }}>
                              {row?.isPaid.toString() === "true" ? (
                                <>
                                  <Icon
                                    icon="fluent-mdl2:completed-solid"
                                    height={30}
                                    width={30}
                                    color="green"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ fontSize: "medium", ml: 1 }}
                                  >
                                    Paid
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <Icon
                                    icon="material-symbols:pending-actions"
                                    height={30}
                                    width={30}
                                    color="lightblue"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ fontSize: "medium", ml: 1 }}
                                  >
                                    Payment pending
                                  </Typography>
                                </>
                              )}
                            </Box>
                          </TableCell>
                          {/* <TableCell sx={{ cursor: "pointer" }}>
                            <Button variant="contained">
                              <EditIcon />
                            </Button>
                          </TableCell>
                          <TableCell sx={{ cursor: "pointer" }}>
                            <Button variant="contained" onClick={() => deleteOrder(row._id)}>
                              <DeleteIcon />
                            </Button>
                          </TableCell> */}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Container>
          <OrderDetailsModel
            open={open}
            handleClose={handleClose}
            orderDetail={orderDetail}
          />
          <UpdateOrderModel
          open={openUpdateModel}
          handleClose={handleCloseUpdateModel}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Orders;
