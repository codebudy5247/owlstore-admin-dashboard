import React, { useState, useEffect,useRef } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as Api from "../services/Api";
import {
    Stack,
    TextField,
    Typography,
    Box,
    Container,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableSortLabel,
  } from "@mui/material";
import moment from "moment";
var XLSX = require("xlsx");


const TABLE_HEAD = [
    { id: "bin", label: "Bin", alignRight: false },
    { id: "base", label: "Base", alignRight: false },
    { id: "zip", label: "Zip", alignRight: false },
    { id: "city", label: "City", alignRight: true },
    { id: "state", label: "State", alignRight: true },
    { id: "country", label: "Country", alignRight: true },
    { id: "price", label: "Price", alignRight: true },
  ];


const AddBulkCard = (props:any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [xlsxData, setXlsxData] = useState<any>();

  // console.log("xlsxData______", xlsxData);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e?.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setXlsxData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleSubmit = async () => {
    for (const item of xlsxData) {
      const [err, res] = await Api.cardInfo(
        item.cardNumber.toString().slice(0, 6)
      );
      if (res) {
        const payloadObj  = {
          street: item.street,
          country: res.data.country.name,
          state: item.state,
          city: item.city,
          zip: item.zip,
          mobile: Number(res.data.bank.phone),
          cardNumber: item.cardNumber,
          expiryDate: item.expiryDate,
          cvv: item.cvv,
          socialSecurityNumber: item.socialSecurityNumber,
          drivingLicenceNumber: item.drivingLicenceNumber,
          level: res.data.scheme,
          price: item.price,
          bankName: res.data.bank.name,
          type: res.data.type,
        };
        // call add product api
        const [error, response] = await Api.createCard(payloadObj);
        if (error) {
            alert("Something went wrong!")
        }
       
      } else {
        alert("Something went wrong!")
      }
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          sx={{ mt: 3 }}
          onClick={handleInputFileRefClick}
        >
          Import through xlsx/xls file
        </Button>
        <input
          onChange={handleFileInput}
          type="file"
          id="file"
          ref={inputFileRef}
          style={{ display: "none" }}
        />
      </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", p: 3 }}
        >
          {/* <Button variant="contained" onClick={handleSubmit}> Submit</Button> */}
        </Box>
        

        {xlsxData?.length === 0 || xlsxData === undefined ? (
            <></>
        ):(
            <>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <TableContainer sx={{ minWidth: 500 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {TABLE_HEAD?.map((headCell: any) => (
                    <TableCell key={headCell.id}>
                      <TableSortLabel hideSortIcon>
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {xlsxData?.length > 0 &&
                  xlsxData?.map((card: any) => (
                    <>
                      <TableRow key={card?._id}>
                        <TableCell sx={{ display: "flex" }}>
                          {/* {displayIcon(card?.type)} */}
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ ml: 1, mt: 1 }}
                          >
                            {card?.cardNumber}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: 2 }}>
                          <Box
                            sx={{
                              backgroundColor: "#FDE7EF",
                              p: 1,
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {moment(card?.base).format("MMMM YY")}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.zip}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.city}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.state}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <img
                            crossOrigin="anonymous"
                            loading="lazy"
                            width="50"
                            height="25"
                            src={`https://countryflagsapi.com/png/${card?.country?.toLowerCase()}`}
                            alt=""
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.price}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={5}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
            //   startIcon={<CurrencyExchangeIcon />}
              sx={{ mt: 3 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {/*  */}
          </Stack>
        </Container>
            </>
        )}
      </DialogActions>
    </Dialog>
  </div>
  )
};

export default AddBulkCard;
