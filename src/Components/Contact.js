import React, { Component } from "react";
// import logo from "../logo.svg";
import "../App.css";
import Search from "../Components/Search";
// import Nav from "../Components/Nav";
import Sighting from "./Sighting";
import Form from "../Components/Form";
// import Location from "../Components/Location";
import axios from "axios";

class About extends Component {
  state = {
    marker: {},
    sightings: [],
    jwt: ""
  };

  componentDidMount() {
    //console.log('component did mount', 19)
  }

  componentWillMount() {
    this.getSightings();
  }

  // set up a fallback image in case no one submits one
  addDefaultSrc(ev) {
    ev.target.src =
      "https://creationexotheology.files.wordpress.com/2017/09/20170913_123642.png";
  }

  getSightings = () => {
    axios
      .get("https://mothman-server.herokuapp.com/users/get-sightings")
      .then(res => {
        let items = res.data;
        console.log(items);

        let approvedSights = items.filter(item => item.isApproved === true);

        console.log(approvedSights);

        let sights = [];

        approvedSights.slice(-6).forEach(item => {
          const sight = {
            id: item._id,
            name: item.witness,
            position: item.location,
            image: item.imageUrl,
            description: item.description,
            seenDate: item.seenDate,
            submitDate: item.submitDate
          };

          sights.push(sight);

          this.setState(
            {
              sightings: sights
            },
            () => {
              // console.log(this.state.sightings)
            }
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // map the retrieved sightings
  showSighting = () => {
    return this.state.sightings.map(sightings => {
      return (
        <div key={sightings.id}>
          <div className="row">
            <div className="col-sm">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  onError={this.addDefaultSrc}
                  src={sightings.image}
                  className="card-img-top"
                  alt="mothman sighting"
                  style={{ maxHeight: `200px` }}
                />
                <div className="card-body">
                  <h5 className="card-title">{sightings.name}</h5>
                  <p className="card-text">
                    {sightings.submitDate.slice(0, -12)}
                  </p>
                </div>
              </div>
              <br />
            </div>
          </div>
          <br />
        </div>
      );
    });
  };

  markerClicked = marker => {
    this.setState({
      marker: marker
    });
  };

  submitSighting = sighting => {
    let newObj = {
      witness: sighting.name,
      seenDate: sighting.date,
      location: sighting.location,
      description: sighting.desc,
      imageUrl: sighting.uploadedImg
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: this.state.jwt
      }
    };
    axios
      .post(
        "https://mothman-server.herokuapp.com/users/new-sighting",
        newObj,
        axiosConfig
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: `whitesmoke`
        }}
        id="aboutBackground"
      >
        {/* nav */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="../">
              Moth Maps
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
   
                <li className="nav-item">
                  <a className="nav-link" href="../about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../sighting-dash">
                    Sightings
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="card border-0 shadow my-5">
            <div className="card-body p-5">
              <section className="mb-4">
                <h2 className="h1-responsive font-weight-bold text-center my-4">
                  Contact us
                </h2>
                <p className="text-center w-responsive mx-auto mb-5">
                  Do you have any questions? Please do not hesitate to contact
                  us directly. Our team will come back to you within a matter of
                  hours to help you.
                </p>
                <div className="row">
                  <div className="col-md-9 mb-md-0 mb-5">
                    <form
                      id="contact-form"
                      name="contact-form"
                      action="mail.php"
                      method="POST"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="md-form mb-0">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                            />
                            <label htmlFor="name" className>
                              Your name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form mb-0">
                            <input
                              type="text"
                              id="email"
                              name="email"
                              className="form-control"
                            />
                            <label htmlFor="email" className>
                              Your email
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              className="form-control"
                            />
                            <label htmlFor="subject" className>
                              Subject
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form">
                            <textarea
                              type="text"
                              id="message"
                              name="message"
                              rows={2}
                              className="form-control md-textarea"
                              defaultValue={""}
                            />
                            <label htmlFor="message">Your message</label>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="text-center text-md-left">
                      <a
                        className="btn btn-primary"
                        onclick="document.getElementById('contact-form').submit();"
                      >
                        Send
                      </a>
                    </div>
                    <div className="status" />
                  </div>
                  <div className="col-md-3 text-center">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <i className="fas fa-map-marker-alt fa-2x" />
                        <p>San Francisco, CA 94126, USA</p>
                      </li>
                      <li>
                        <i className="fas fa-phone mt-4 fa-2x" />
                        <p>+ 01 234 567 89</p>
                      </li>
                      <li>
                        <i className="fas fa-envelope mt-4 fa-2x" />
                        <p>contact@mdbootstrap.com</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
          <div className="container text-center">
            <small>Copyright ©2019 Moth Maps</small>
          </div>
        </footer>
      </div>
    );
  }
}

export default About;
