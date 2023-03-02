import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../components/Navbar";
import * as Api from "../services/Api";
import { Button, Container, Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddProductModel from "../components/AddProductModel";
import AddBulkCard from "../components/AddBulkCard";
const mdTheme = createTheme();

const formatString = (_str: string) => {
  return (
    _str?.substring(0, 6) +
    "..." +
    _str?.substring(_str.length - 5, _str.length)
  );
};

const Products = () => {
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const [err, res] = await Api.getCards();
      if (res) {
        setProducts(res?.data);
      }
      setLoading(false);
    };
    init();
  }, []);

  const deleteProduct = async (item: any) => {
    const [error, response] = await Api.deleteCard(item._id);
    if (error) {
      alert(error?.data)
    }
    if (response) {
      alert("Deleted")
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Navbar title="Products" />
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
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3,gap:2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen1}
              >
                Add Bulk Card
              </Button>
            </Box>
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
                      <TableCell>ID</TableCell>
                      <TableCell>CN</TableCell>
                      <TableCell>Expiry Date</TableCell>
                      <TableCell>CVV</TableCell>
                      <TableCell>SSN</TableCell>
                      <TableCell>DL</TableCell>
                      <TableCell>Level</TableCell>
                      {/* <TableCell>Class</TableCell> */}
                      <TableCell>Price</TableCell>
                      <TableCell>BankName</TableCell>
                      <TableCell>Type</TableCell>
                      {/* <TableCell>Other Details</TableCell> */}
                      <TableCell>Seller</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products?.length > 0 &&
                      products.map((row: any) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            {moment(row?.createdAt).format("MMMM YY")}
                          </TableCell>
                          <TableCell>{formatString(row?._id)}</TableCell>
                          <TableCell>
                            {row?.cardNumber?.slice(0, 6)}...
                          </TableCell>
                          <TableCell>
                            {moment(row?.expiryDate).format("MMMM YY")}
                          </TableCell>
                          <TableCell>{row?.cvv}</TableCell>
                          <TableCell>
                            {row?.socialSecurityNumber?.slice(0, 6)}...
                          </TableCell>
                          <TableCell>
                            {row?.drivingLicenceNumber?.slice(0, 6)}...
                          </TableCell>
                          <TableCell>{row?.level}</TableCell>
                          {/* <TableCell>{row?.class}</TableCell> */}
                          <TableCell>{row?.price}</TableCell>
                          <TableCell>{row?.bankName}</TableCell>
                          <TableCell>{row?.type}</TableCell>
                          {/* <TableCell>{row?.otherDetails}</TableCell> */}
                          <TableCell>
                            {row?.createdBy?.slice(0, 6)}...
                          </TableCell>
                          <TableCell sx={{ cursor: "pointer" }}>
                            <Button variant="contained" onClick={() => deleteProduct(row)}>
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Container>
          <AddProductModel open={open} handleClose={handleClose} />
          <AddBulkCard open={open1} handleClose={handleClose1} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Products;
