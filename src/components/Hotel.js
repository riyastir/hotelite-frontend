import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { API_URL } from '../config';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

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
const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};
export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [stateProvice, setStateProvice] = useState("");
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [initLoad, setInitLoad] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [currentLogo, setCurrentLogo] = useState("");
  const [authState, setAuthState] = useState(true);
  const autoCompleteRef = useRef(null);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let autoComplete;

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: [], componentRestrictions: { country: "my" } }
    );
    autoComplete.setFields([
      "address_components",
      "formatted_address",
      "geometry",
    ]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const geoMetry = addressObject.geometry;
    const addressComponents = addressObject.address_components;
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log(addressObject);
    console.log(geoMetry.location.lat());
    console.log(geoMetry.location.lng());
    setLat(geoMetry.location.lat());
    setLng(geoMetry.location.lng());
    addressComponents.map((address) => {
      if (address.types[0] == "country") {
        setCountry(address.long_name);
      }
      if (address.types[0] == "country") {
        setCountryCode(address.short_name);
      }
      if (address.types[0] == "administrative_area_level_1") {
        setStateProvice(address.long_name);
      }
      if (address.types[0] == "locality") {
        setCity(address.long_name);
      }
    });
  }

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnWl4UC8rJBIJ3XLcmPaLFrcs4BAGehaE&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
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
        console.log(data.status);
        //setCity(data.data.state);
      });
    const profile = fetch(`${API_URL}/api/profile`, {
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
        if (setInitLoad) {
          setName(data.data.name);
          setCity(data.data.city);
          setLat(data.data.lat);
          setLng(data.data.lng);
          setStateProvice(data.data.state);
          setCountry(data.data.country);
          setCountryCode(data.data.country_code);
          setCurrentLogo(data.data.logo);
          setInitLoad(false);
        }
        //setCity(data.data.state);
      });
  }, []);
  console.log(selectedFile);
  let logoBase64 = "";
  if (selectedFile != "") {
    getBase64(selectedFile, (result) => {
      logoBase64 = result;
    });
    console.log(logoBase64);
  }

  let saveProfile = async () => {
    let url = `${API_URL}/api/profile`;
    let data = {
      logo: logoBase64,
      name: name,
      locality: city,
      city: city,
      state: stateProvice,
      lat: lat,
      lng: lng,
      country_code: countryCode,
      country: country,
    };

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        //'Content-Type': 'application/x-www-form-urlencoded',
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
        <Typography gutterBottom>
          Profile
        </Typography>
        <div className="search-location-input"></div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img src={currentLogo} width="200px"></img>
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />
            <label htmlFor="raised-button-file">
              <Button
                component="span"
                className={classes.button}
              >
                Upload Hotel Logo / Image
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Hotel name"
              fullWidth
              autoComplete="hotel-name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="address"
              name="address"
              inputRef={autoCompleteRef}
              onChange={(event) => setQuery(event.target.value)}
              label="Address"
              fullWidth
              value={query}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="city"
              value={city}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="lat"
              name="lat"
              label="Latitude"
              fullWidth
              autoComplete="lat"
              value={lat}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="lng"
              name="lng"
              label="Longitude"
              fullWidth
              autoComplete="lng"
              value={lng}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              label="State"
              value={stateProvice}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="country"
              value={country}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveProfile}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </main>
  );
}
