import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button, { ButtonProps } from "@mui/material/Button";
import { Box, Stack, TextField, Typography, Autocomplete } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {  toast } from "react-toastify";
import * as Api from "../services/Api";


//: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SELLER"],

const addUserOption = [
  {
    value: "ROLE_USER",
    label: "USER",
  },
  {
    value: "ROLE_SELLER",
    label: "SELLER",
  },
  {
    value: "ROLE_ADMIN",
    label: "ADMIN",
  },
];

const AddUserModel = (props: any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const onChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const onChangeRole = (e:any,values:any) =>{
    setRole(values.value)
  }

  const onClickSubmit = async () => {
    // setLoading(true);

    const [signUpError, signUpResponse] = await Api.addUser(
      username,
      email,
      password,
      role
    );
    if (signUpError) {
     
    }
    if (signUpResponse) {
      console.log( signUpResponse?.data?.result);
      alert("User Added")
      props.handleClose()
      props?.getUser()
    }
    // setLoading(false);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={props?.handleClose}>
              <CloseIcon />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField
                required={true}
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                onChange={onChangeUserName}
              />
              {/* Expiry Date */}
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                onChange={onChangeEmail}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField
                required={true}
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                onChange={onChangePassword}
              />

              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={addUserOption}
                onChange={onChangeRole}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User Role"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", p: 3 }}
          >
            <Button variant="contained" onClick={onClickSubmit}> Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUserModel;
