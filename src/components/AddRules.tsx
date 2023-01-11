import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Box, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Api from "../services/Api";
import CircularProgress from "@mui/material/CircularProgress";

const AddRules = (props: any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };

  const handleOnSubmit = async () => {
    const [err, res] = await Api.createRules(title, content);
    if (res) {
      props.handleClose();
      alert("Rules Added");
      props.get_rules();
    }
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
            <Stack direction={{ xs: "column", sm: "column" }} spacing={5}>
              <TextField
                required={true}
                fullWidth
                id="title"
                label="Title"
                variant="outlined"
                onChange={onChangeTitle}
                // disabled
              />
              <TextField
                required={true}
                multiline
                rows={4}
                fullWidth
                id="content"
                label="Content"
                variant="outlined"
                onChange={onChangeContent}
                // value={user?.email_id}
                // disabled
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", p: 3 }}
          >
            <Button
              variant="contained"
              onClick={handleOnSubmit}
              // disabled={!amount}
            >
              {" "}
              Submit
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRules;
