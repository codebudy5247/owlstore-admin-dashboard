import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Toolbar from "@mui/material/Toolbar";
import * as Api from "../services/Api";
import { Button, Card, Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import ReplyModel from "../components/ReplyModel";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
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
      <Typography
        variant="subtitle2"
        sx={{ fontSize: "medium", fontWeight: "bold", textAlign: "start" }}
      >
        {" "}
        {user?.username}{" "}
      </Typography>
    </>
  );
};

const Reply = (props: any) => {
  const [answer, setAnswer] = useState<any>();
  const getAnswer = async () => {
    for (const ansID of props.answerId) {
      const [err, res] = await Api.getReplyAnswer(ansID);
      if (res) {
        setAnswer(res?.data);
      }
    }
  };

  useEffect(() => {
    getAnswer();
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h5" sx={{ textAlign: "start" }}>
          Response:
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "start" }}>
          {answer?.content}
        </Typography>
      </Box>
    </>
  );
};

const mdTheme = createTheme();

const Tickets = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<any>(false);
  const [tickets, setTickets] = useState<any>();
  const [ticketId, setTicketID] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = (ticketId: any) => {
    setAnchorEl(null);
    setTicketID(ticketId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const get_tickets = async () => {
    const [err, res] = await Api.getTickets();
    if (res) {
      console.log(res);
      setTickets(res?.data);
    }
  };
  useEffect(() => {
    const init = async () => {
      await get_tickets();
    };
    init();
  }, []);

  const openM = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseM = () => {
    setAnchorEl(null);
  };

  const closeTicketHandler = async (ticketId: string) => {
    const [err, res] = await Api.closeTicket(ticketId);
    if (err) {
      alert(err?.data);
    }
    if (res) {
      alert("Ticket closed!");
      get_tickets();
    }
  };

  const deleteTicketHandler = async (ticketId: string) => {
    const [error, response] = await Api.deleteTicket(ticketId);
    if (error) {
      alert(error?.data);
    }
    if (response) {
      alert("Deleted");
      get_tickets();
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Navbar title="Tickets" />
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
              <>
                <Box>
                  {tickets?.length > 0 &&
                    tickets.map((o: any) => (
                      <Card
                        sx={{
                          mb: 3,
                          boxShadow: 5,
                          borderRadius: 3,
                          p: 3,
                          width: "90%",
                          mt: 4,
                        }}
                      >
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{ textAlign: "start" }}
                            >
                              {o?.title}
                            </Typography>
                            {o?.status === "CLOSED" ? (
                              <>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                  <Button variant="contained" disabled>
                                    {o?.status}
                                  </Button>
                                  <Button
                                    onClick={() => deleteTicketHandler(o?._id)}
                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                  >
                                    Delete
                                  </Button>
                                </Box>
                              </>
                            ) : (
                              <>
                                <IconButton
                                  aria-label="more"
                                  id="long-button"
                                  aria-controls={
                                    openM ? "long-menu" : undefined
                                  }
                                  aria-expanded={openM ? "true" : undefined}
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="demo-positioned-menu"
                                  aria-labelledby="demo-positioned-button"
                                  anchorEl={anchorEl}
                                  open={openM}
                                  onClose={handleCloseM}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                >
                                  <MenuItem onClick={() => handleOpen(o?._id)}>
                                    Reply
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => closeTicketHandler(o._id)}
                                  >
                                    Close ticket
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => deleteTicketHandler(o?._id)}
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </>
                            )}
                          </Box>

                          <Typography
                            variant="body1"
                            sx={{ textAlign: "start" }}
                          >
                            {o?.content}
                          </Typography>

                          <UserDetails merchant={0} userID={o?.createdBy} />
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ textAlign: "start" }}
                          >
                            {moment(o?.createdAt).format("MM-DD-YYYY HH:mm")}
                          </Typography>

                          <br />
                          <Reply answerId={o.reply.map((rep: any) => rep)} />
                        </>
                      </Card>
                    ))}
                </Box>
              </>
            )}
          </Container>
          <ReplyModel
            open={open}
            handleClose={handleClose}
            ticketId={ticketId}
            get_tickets={get_tickets}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Tickets;
