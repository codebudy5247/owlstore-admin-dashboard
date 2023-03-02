import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Box, Stack, TextField, Typography,Autocomplete } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "@iconify/react";
import { pink } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { countries } from "../_countries";
import { USAstates } from "../_states";
import * as Api from "../services/Api";

import moment from "moment";

const classOption = [
    {
      value: "credit",
      label: "Credit",
    },
    {
      value: "debit",
      label: "Debit",
    },
  ];
  
  const levelOption = [
    {
      value: "classic",
      label: "Classic",
    },
    {
      value: "platinum",
      label: "Platinum",
    },
  ];

const AddProductModel = (props: any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl
  const [ccNumber, setCcNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [street, setStreet] = useState("");
  const [mobile, setMobile] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [dl, setDl] = useState("");
  const [ssn, setSsn] = useState("");
  const [class_option, setClassOption] = useState("");
  const [label, setLabel] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [price, setPrice] = useState("");
  const [bankName, setBankName] = useState("");

  const [cardInfo, setCardInfo] = useState<any>();

  console.log(cardInfo?.country?.name, "Card Info___________");

  const onChangeCCNumber = async (e: any) => {
    setCcNumber(e.target.value);
  };
  const onChangeExpiryDate = (e: any) => {
    let date = moment(e.target.value).toISOString(); //ISO 8601 format
    setExpiryDate(date);
  };
  const onChangeCVV = (e: any) => {
    setCVV(e.target.value);
  };
  const onChangeStreet = (e: any) => {
    setStreet(e.target.value);
  };
  const onChangeMobile = (e: any) => {
    setMobile(e.target.value);
  };
  const onChangeZip = (e: any) => {
    setZip(e.target.value);
  };
  const onChangeState: any = (e: any, values: any) => {
    setState(values.code);
  };
  const onChangeCity = (e: any) => {
    setCity(e.target.value);
  };
  const onChangeDl = (e: any) => {
    setDl(e.target.value);
  };
  const onChangeSsn = (e: any) => {
    setSsn(e.target.value);
  };
  const onChangeOtherDetails = (e: any) => {
    setOtherDetails(e.target.value);
  };
  const onChangePrice = (e: any) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    const getCardInfo = async () => {
      let cardNumber = ccNumber.slice(0, 6);
      const [err, res] = await Api.cardInfo(cardNumber);
      if (res) {
        setCardInfo(res?.data);
      }
    };
    getCardInfo();
  }, [ccNumber]);

  const OnSubmit = async () => {
    if (cardInfo) {
      const payloadObj = {
        street: street,
        country: cardInfo.country.name,
        state: state,
        city: city,
        zip: zip,
        mobile: Number(cardInfo.bank.phone),
        cardNumber: ccNumber,
        expiryDate: expiryDate,
        cvv: CVV,
        socialSecurityNumber: ssn,
        drivingLicenceNumber: dl,
        level: cardInfo.scheme,
        price: price,
        bankName: cardInfo.bank.name,
        type: cardInfo.type,
      };

      const [err, res] = await Api.createCard(payloadObj);
      if (err) {
        alert(err?.data)
       
      }
      if (res) {
        alert("Created!")
       
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
        <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* Card Number */}
          <TextField
            required={true}
            fullWidth
            id="base"
            label="CC Number"
            variant="outlined"
            onChange={onChangeCCNumber}
          />
          {/* Expiry Date */}
          <label>Expiry Date</label>
          {/* <input
            width={200}
            type="month"
            id="start"
            name="start"
            min="2022-01"
            defaultValue="2022-01"
            onChange={onChangeExpiryDate}
          ></input> */}
           <TextField
            type="month"
            required={true}
            fullWidth
            id="start"
            name="start"
            // min="2022-01"
            defaultValue="2022-01"
            onChange={onChangeExpiryDate}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* CVV */}
          <TextField
            required={true}
            fullWidth
            id="base"
            label="CVV"
            variant="outlined"
            onChange={onChangeCVV}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* street */}
          <TextField
            required={true}
            fullWidth
            id="street"
            label="Street"
            variant="outlined"
            onChange={onChangeStreet}
          />
          {/* Mobile */}
          <TextField
            required={true}
            fullWidth
            id="mobile"
            // label="Phone number"
            variant="outlined"
            value={cardInfo?.bank?.phone}
            // onChange={onChangeMobile}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* Zip code */}
          <TextField
            required={true}
            fullWidth
            id="base"
            label="Zip Code"
            variant="outlined"
            onChange={onChangeZip}
          />
          {/* Country */}
          <TextField
            required={true}
            fullWidth
            id="mobile"
            // label="Phone number"
            variant="outlined"
            value={cardInfo?.country?.name}
            // onChange={onChangeMobile}
          />
          {/* <Autocomplete
            fullWidth
            id="country-select-demo"
            // sx={{ width: 400 }}
            options={countries}
            onChange={onChangeCountry}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          /> */}
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* States */}
          <Autocomplete
            fullWidth
            id="country-select-demo"
            options={USAstates}
            onChange={onChangeState}
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
                label="States"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          {/* City */}
          <TextField
            required={true}
            fullWidth
            id="zip"
            label="City"
            variant="outlined"
            onChange={onChangeCity}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* Type */}
          <TextField
            required={true}
            fullWidth
            id="od"
            // label="Type"
            variant="outlined"
            value={cardInfo?.type}
          />
          {/* Label */}
          <TextField
            required={true}
            fullWidth
            id="od"
            // label="Lavel"
            variant="outlined"
            value={cardInfo?.scheme}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* ODetails */}
          <TextField
            required={true}
            fullWidth
            id="od"
            label="Other Details.."
            variant="outlined"
            onChange={onChangeOtherDetails}
          />
          <TextField
            required={true}
            fullWidth
            id="od"
            label="Price"
            variant="outlined"
            onChange={onChangePrice}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* DL */}
          <TextField
            // required={true}
            fullWidth
            id="zip"
            label="Driving Licence Number"
            variant="outlined"
            onChange={onChangeDl}
          />
          {/* SSN */}
          <TextField
            // required={true}
            fullWidth
            id="ssn"
            label="Social Security Number"
            variant="outlined"
            onChange={onChangeSsn}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField
            required={true}
            fullWidth
            id="od"
            // label="Bank"
            variant="outlined"
            value={cardInfo?.bank?.name}
          />
        </Stack>
      </Stack>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", p: 3 }}
          >
            <Button variant="contained" onClick={OnSubmit}> Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProductModel;
