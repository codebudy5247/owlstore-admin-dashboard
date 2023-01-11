import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Toolbar from "@mui/material/Toolbar";
import * as Api from "../services/Api";
import { Card, Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import ReplyModel from "../components/ReplyModel";

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
  const [loading, setLoading] = useState<any>(false);
  const [tickets, setTickets] = useState<any>();
  const [ticketId, setTicketID] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = (ticketId: any) => {
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

                            <SendIcon
                              onClick={() => handleOpen(o?._id)}
                              sx={{ cursor: "pointer" }}
                            />
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
