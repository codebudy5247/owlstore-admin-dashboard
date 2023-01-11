import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Api from "../services/Api";
import { Button, Container, Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import AddUserModel from "../components/AddUserModel";

const mdTheme = createTheme();

const Users = () => {
  const [users, setUsers] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatString = (_str: string) => {
    return (
      _str?.substring(0, 6) +
      "..." +
      _str?.substring(_str.length - 5, _str.length)
    );
  };


  const deleteUser = async (userId: any) => {
    const [error, response] = await Api.deleteUser(userId);
    if (error) {
    }
    if (response) {
      alert("Deleted")
      getUser()
    }
  };

  const getUser = async() =>{
    setLoading(true);
      const [err, res] = await Api.getUsers();
      if (res) {
        setUsers(res?.data?.users);
      }
      setLoading(false);
  }


  useEffect(() => {
    const init = async () => {
     await getUser()
    };
    init();
  }, []);


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Navbar title="Users" />
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
             <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add
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
                      <TableCell>Register Date</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Password</TableCell>
                     
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users?.length > 0 &&
                      users.map((row: any) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{moment(row?.createdAt).format('DD-MM-YYYY,h:mm a')}</TableCell>
                          <TableCell>{formatString(row?._id)}</TableCell>
                          <TableCell>{row?.username}</TableCell>
                          <TableCell>{row?.email_id}</TableCell>
                          <TableCell>{row?.role}</TableCell>
                          <TableCell>{formatString(row?.password)}</TableCell>
                          {/* <TableCell sx={{ cursor: "pointer" }}>
                            <Button variant="contained">
                              <EditIcon />
                            </Button>
                          </TableCell> */}
                          <TableCell sx={{ cursor: "pointer" }}>
                            <Button variant="contained" onClick={() => deleteUser(row?._id)}>
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
          <AddUserModel open={open} handleClose={handleClose} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Users;
