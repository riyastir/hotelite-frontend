import React, { useState,useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { API_URL } from '../config';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(12),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Package() {
  const classes = useStyles();
  const history = useHistory();
  const [price, setPrice] = useState("");
  const [duration_days, setDurationDays] = useState("");
  const [duration_nights, setDurationNights] = useState("");
  const [validity, setValidity] = useState(new Date());
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [authState, setAuthState] = useState(true);

  useEffect(() => { 
    const authCheck = fetch(`${API_URL}/api/auth-check`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("_token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status=='success'){
            setAuthState(true)
        } else {
            setAuthState(false)
        }
      });
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleDateChange = (date) => {
    setValidity(date);
  };
  let savePackage = async () => {
    let url = `${API_URL}/api/package`;
    let data = {
      price: price,
      duration_days: duration_days,
      duration_nights: duration_nights,
      validity: validity,
      description: description,
    };

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log("Response", r.status);
        // history.push('/');
        if (r.status == "success") {
          setMessage(r.message);
          setSeverity("success");
          setOpen(true);
        } else {
          setMessage(r.message);
          setSeverity("error");
          setOpen(true);
        }
      })
      .catch((error) => {
        setMessage("Something went wrong");
        setSeverity("error");
        setOpen(true);
      });
  };
  return (
    <main className={classes.content}>
      {localStorage.getItem("_token") == ''? history.push("/login") : ""}
      {authState == false ? history.push("/login") : ""}
      <div className={classes.toolbar} />
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Create Package
        </Typography>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              fullWidth
              autoComplete="price"
              onChange={(event) => setPrice(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="duration_days"
              name="duration_days"
              label="Duration (Days)"
              fullWidth
              autoComplete="duration_days"
              onChange={(event) => setDurationDays(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="duration_nights"
              name="duration_nights"
              label="Duration (Nights)"
              fullWidth
              autoComplete="duration_nights"
              onChange={(event) => setDurationNights(event.target.value)}
            />
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                required
                margin="normal"
                id="validity"
                name="validity"
                label="Validity"
                format="yyyy-MM-dd"
                fullWidth
                autoComplete="validity"
                onChange={handleDateChange}
                value={validity}
                KeyboardButtonProps={{
                  "aria-label": "validity",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item xs={12}>
            <TextField
              required
              id="Description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              defaultValue=""
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={savePackage}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </main>
  );
}
