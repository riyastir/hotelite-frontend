import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import MUIDataTable from "mui-datatables";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { API_URL } from '../config';

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
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [deleteValue, setDeleteValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [authState, setAuthState] = useState(true);

  useEffect(() => {
    const authCheck = fetch(`${API_URL}/api/auth-check`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          setAuthState(true);
        } else {
          setAuthState(false);
        }
      });
    const packageList = fetch(`${API_URL}/api/package`, {
      method: "GET",
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
    })
      .then((response) => response.json())
      .then((data) => {
        let array = [];
        data.data.map((d) => {
          array.push([
            d.id,
            d.price,
            d.duration_days,
            d.duration_nights,
            d.validity,
          ]);
        });
        setRows(array);
        console.log(array);
      });
  }, [deleteValue]);

  const handleClickOpen = (id) => {
    setDeleteValue(id);
    setOpenDialog(true);
    console.log(id);
  };

  const handleCloseDialog = () => {
    setDeleteValue(0);
    setOpenDialog(false);
  };
  const columns = [
    "ID",
    "Price",
    "Duration Days",
    "Duration Nights",
    "Validity",
    {
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Button
                color="primary"
                onClick={() =>
                  history.push("/edit-package/" + tableMeta.rowData[0])
                }
              >
                Edit
              </Button>

              <Button
                color="primary"
                onClick={() => handleClickOpen(tableMeta.rowData[0])}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const options = {};

  let deletePackage = async () => {
    handleCloseDialog();
    let url = `${API_URL}/api/package/${deleteValue}`;

    const response = await fetch(url, {
      method: "DELETE",
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <main className={classes.content}>
      {localStorage.getItem("_token") == "" ? history.push("/login") : ""}
      {authState == false ? history.push("/login") : ""}
      <div className={classes.toolbar} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <div style={{ height: 400, width: "100%" }}>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Package Delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete this package?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              No
            </Button>
            <Button onClick={deletePackage} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <MUIDataTable
          title={"Packages List"}
          data={rows}
          columns={columns}
          options={options}
        />
      </div>
    </main>
  );
}
