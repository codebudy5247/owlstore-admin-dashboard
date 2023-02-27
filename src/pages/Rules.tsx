import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Toolbar from "@mui/material/Toolbar";
import { Container, Button, Typography, Card } from "@mui/material";
import * as Api from "../services/Api";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRules from "../components/AddRules";

const mdTheme = createTheme();
const Rules = () => {
  const [loading, setLoading] = useState<any>(false);
  const [rules, setRules] = useState<any>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const get_rules = async () => {
    const [err, res] = await Api.getRules();
    if (res) {
      console.log(res);
      setRules(res?.data);
    }
  };

  useEffect(() => {
    const init = async () => {
      await get_rules();
    };
    init();
  }, []);

  const deleteRules = async (rulesId: any) => {
    const [error, response] = await Api.deleteRules(rulesId);
    if (error) {
      alert(error?.data);
    }
    if (response) {
      alert("Deleted");
      get_rules();
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Navbar title="Rules" />
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
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add rules
              </Button>
            </Box>
            {loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <>
                <Box>
                  {rules?.length > 0 &&
                    rules.map((o: any) => (
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

                            <DeleteIcon
                                onClick={() => deleteRules(o?._id)}
                              sx={{ cursor: "pointer" }}
                            />
                          </Box>

                          <Typography
                            variant="body1"
                            sx={{ textAlign: "start" }}
                          >
                            {o?.content}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ textAlign: "start" }}
                          >
                            {moment(o?.createdAt).format("MM-DD-YYYY HH:mm")}
                          </Typography>
                        </>
                      </Card>
                    ))}
                </Box>
              </>
            )}
          </Container>
          <AddRules open={open} handleClose={handleClose} get_rules={get_rules} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Rules;
