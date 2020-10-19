import React, { useState, useEffect } from "react";
import { API_URL } from '../config';

export default function Home() {
  const [packages, setPackage] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const packages = fetch(`${API_URL}/api/packages/all`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        setPackage(data.data);
      });
    const summary = fetch(`${API_URL}/api/summary`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        setSummary(data);
      });
    const recommended = fetch(`${API_URL}/api/recommended`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommended(data.data);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="spinner-wrapper">
          <div className="logo-spinner">
            <img src="assets/img/logo-2.png" alt="" />
          </div>
          <div className="spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
        {/* End of Preloader */}
        {/* Header */}
        <header className="header">
          <div className="base-header">
            <div className="header-topbar">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <ul className="topbar-left list-unstyled list-inline float-left">
                      <li className="language">
                        <a href="#" className="dropdown-text text-dark">
                          <img src="assets/img/flat-malaysia.png" alt="" />
                          <span>Malaysia</span>
                        </a>
                      </li>
                      <li className="monney">
                        <a href="#" className="dropdown-text text-dark">
                          {" "}
                          <span>MYR</span>
                        </a>
                        <ul className="dropdown-monney list-unstyled hide">
                          <li>
                            {" "}
                            <a href="#" className="link">
                              VND
                            </a>
                          </li>
                          <li>
                            {" "}
                            <a href="#" className="link">
                              Euro
                            </a>
                          </li>
                          <li>
                            {" "}
                            <a href="#" className="link">
                              JPY
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="topbar-right list-unstyled list-inline float-right">
                      <li className="topbar-login">
                        <a href="/login" className="text-dark">
                          <i className="fas fa-user" />
                          Login
                        </a>
                      </li>
                      <li className="topbar-register">
                        <a href="/register" className="text-dark">
                          <i className="fas fa-edit" />
                          Register
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-default header-style-2">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="brand-logo">
                      <div className="logo-white">
                        <a href="#">
                          <img
                            src="assets/img/logo-2.png"
                            alt=""
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="logo-black">
                        <a href="#">
                          <img
                            src="img/logo-1.png"
                            alt=""
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* End Header */}
        {/* Content Page */}
        <div className="wrapper-page">
          <div className="content">
            {/* Slide Section */}
            <div className="bg-slide bg-home3 d-flex h-100">
              <div className="content-slide align-self-center w-100">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-slide text-center">
                        <h1 className="animated-Fade-In-Up-1">
                          Stay Like a King
                        </h1>
                        <h3 className="animated-Fade-In-Up-2">
                          Best Hotel Packages
                        </h3>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="tab-home-3 animated-Fade-In-Up-5">
                        <div className="base-tab-content">
                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="pills-flight"
                              role="tabpanel"
                              aria-labelledby="pills-flight-tab"
                            >
                              <div className="base-find-hotel">
                                <div className="find-hotel-title text-center">
                                  <h1>Find Your Hotel</h1>
                                </div>
                                <div className="find-hotel-form">
                                  <div className="row">
                                    <div className="col-md-4 col-lg-4">
                                      <div className="form-group">
                                        <label>Where do you want to go?</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Write the place"
                                        />{" "}
                                        <i className="fas fa-map-marker-alt" />
                                      </div>
                                    </div>
                                    <div className="col-6 col-md-2 col-lg-2">
                                      <div className="form-group">
                                        <label>Check in</label>
                                        <input
                                          type="text"
                                          className="form-control date"
                                          placeholder="MM/DD/YY"
                                        />{" "}
                                        <i className="fas fa-calendar-alt" />
                                      </div>
                                    </div>
                                    <div className="col-6 col-md-2 col-lg-2">
                                      <div className="form-group">
                                        <label>Check out</label>
                                        <input
                                          type="text"
                                          className="form-control date"
                                          placeholder="MM/DD/YY"
                                        />{" "}
                                        <i className="fas fa-calendar-alt" />
                                      </div>
                                    </div>
                                    <div className="col-6 col-md-2 col-lg-2">
                                      <div className="form-group">
                                        <label>Adult</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={1}
                                        />{" "}
                                        <i className="fas fa-user" />
                                      </div>
                                    </div>
                                    <div className="col-6 col-md-2 col-lg-2">
                                      <div className="form-group">
                                        <label>Children</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder={1}
                                        />{" "}
                                        <i className="fas fa-user" />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="group-btn-flight">
                                        {" "}
                                        <a href="#" className="btn btn-primary">
                                          <i className="fas fa-search" />
                                          Search now{" "}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Start Packages Section */}
            <div className="awesome-tour">
              <div className="title-page text-center">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h1>HOTELS</h1>
                      <h3>Packages for you</h3>
                      <hr className="line-title" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-card-tour">
                <div className="container">
                  <div className="row">
                    {packages.map((hotelPackage, index) => (
                      <div className="col-md-6 col-lg-4 pb-4" key={index}>
                        <div className="card-tour animated-Fade-In-Up-1">
                          <div className="images-card-tour">
                            <a href="#">
                              <img
                                src={hotelPackage.user.logo}
                                className="card-img-top"
                                alt={hotelPackage.user.name}
                                style={{ "object-fit": "cover" }}
                                height="250px"
                              />
                            </a>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title" style={{ "text-overflow": "ellipsis","overflow": 'hidden',"white-space": "nowrap"}}>
                              {hotelPackage.user.name}
                            </h5>
                            <ul className="list-info list-inline list-unstyle">
                              <li>
                                <a href="#" className="link" tabIndex={0}>
                                  <i className="fa fa-wifi" />
                                  <i className="fa fa-glass-martini" />
                                  <i className="fa fa-utensils" />
                                  <i className="fa fa-tv" />
                                </a>
                              </li>
                              <li>
                                <a href="#" className="link" style={{ "text-overflow": "ellipsis","overflow": 'hidden',"white-space": "nowrap", "width":"100px"}} tabIndex={0}>
                                  {hotelPackage.user.city}
                                </a>
                              </li>
                              <li>
                                <a href="#" className="link" style={{ "text-overflow": "ellipsis","overflow": 'hidden',"white-space": "nowrap","width":"100px"}} tabIndex={0}>
                                  {hotelPackage.user.state}
                                </a>
                              </li>
                            </ul>
                            <div className="content-price">
                              {" "}
                              <span className="price">
                                MYR {hotelPackage.price}
                              </span>
                              <span className="for-price">
                                <i className="fas fa-calendar-alt" />
                                {hotelPackage.duration_days} Days{" "}
                                {hotelPackage.duration_nights} Nights
                              </span>
                            </div>
                            <div className="pb-4">
                              <span className="text-danger">Expires on</span>
                              <span className="text-danger">
                                {" "}
                                {hotelPackage.validity}
                              </span>
                            </div>
                            <div className="group-btn-card">
                              {" "}
                              <a href="#" className="btn btn-primary">
                                Book Now
                              </a>
                              <a
                                href="#"
                                onClick={(event) =>
                                  setDescription(hotelPackage.description)
                                }
                                className="btn btn-secondary"
                                data-toggle="modal"
                                data-target="#exampleModal"
                              >
                                Read more
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* End Packages Section */}
            {/* Start Summary Section */}
            <div className="number-features">
              <div className="group-number-features">
                <div className="container">
                  <div className="row">
                    <div className="number-title">
                      <h1>Summary</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <div className="card-number text-center">
                        <h3 className="count">{summary.hotels}</h3>
                        <p>Hotels</p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="card-number text-center">
                        <h3 className="count">{summary.packages}</h3>
                        <p>Packages</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Summary Section */}
            {/* Featured Hotel Section */}
            <div className="featured-hotel">
              <div className="title-page text-center">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h1>BEST</h1>
                      <h3>RECOMMENDED HOTELS</h3>
                      <hr className="line-title" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-card-hotel">
                <div className="container">
                  <div className="row mb-4">
                    {recommended.map((rec, index) => (
                      <div className="col-md-12 col-lg-6 mt-5" key={index}>
                        <div className="card-hotel animated-Fade-In-Left">
                          <div className="row no-gutters">
                            <div className="col-md-5">
                              <div className="images-card-hotel">
                                {" "}
                                <a href="#" className="btn btn-primary">
                                  Book Now
                                </a>
                                <a href="#" className="img-card-hotel">
                                  <img
                                    src={rec.logo}
                                    style={{ "object-fit": "cover" }}
                                    className="card-img"
                                    alt="..."
                                    height="150px"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="card-body">
                                <h5 className="card-title" style={{ "text-overflow": "ellipsis","overflow": 'hidden',"white-space": "nowrap"}}>{rec.name} </h5>
                                <div className="review-hotel">
                                  {" "}
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                </div>
                                <p className="card-text" style={{ "text-overflow": "ellipsis","overflow": 'hidden',"white-space": "nowrap"}}>
                                  {rec.city}
                                  {","}
                                  {rec.state}
                                  {","}
                                  {rec.country}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* End Featured Hotel Section */}
          </div>
          {/* Button Back Top */}
          <div className="back-top">
            {" "}
            <a href="#top">
              <i className="fas fa-angle-up" />
            </a>
          </div>
          {/* End Button Back Top */}
        </div>
        {/* End Content Page */}
        {/* Footer Style */}
        <footer>
          <div className="bg-footer">
            <div className="footer-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-lg-3">
                    <div className="info-company-widget">
                      <div className="footer-logo">
                        <h1>
                          <a href="#" className="text-danger">
                            HotElite
                          </a>
                        </h1>
                      </div>
                      <div className="content-widget">
                        <p></p>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="copyright">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="text-coppyright text-center">
                      {" "}
                      <small>HotElite By Mohamed Riyas</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Package Description
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">{description}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-sm btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
