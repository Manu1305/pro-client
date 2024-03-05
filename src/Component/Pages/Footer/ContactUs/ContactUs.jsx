import React, { useState } from "react";
// import styles from "./ContactUs.module.css";
import Swal from "sweetalert2";
export const ContactUs = () => {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbyrB5Q3h2D3s_Q_g8on5YZDdC7AmQpl_iDFOhtt7RSskIVpoBfjxqs5ekDhS8mhk0dq1g/exec";

  const handleSubmit = (e) => {
    const formele = document.querySelector("form");

    e.preventDefault();

    const formData = new FormData(formele);

    fetch(scriptUrl, { method: "POST", body: formData })
      .then((res) => {
        Swal.fire(
          "Your Message is Successfully Submitted, We will get back to you as soon as possible"
        );
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container-xxl contact py-5">
      <div className="container">
        <div
          className="section-title text-center mx-auto wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "500px" }}
        >
          {/* <p className="fs-5 fw-medium fst-italic text-primary">Contact Us</p> */}
          <h1 className="display-6 font-semibold text-danger">
            If You Have Any Query, Please Contact Us
          </h1>
        </div>
        <div className="row g-5 mb-5 mt-3">
          <div
            className="col-md-4 text-center wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="btn-square mx-auto mb-3">
              <i className="fa fa-envelope fa-2x text-danger"></i>
            </div>
            <p className="mb-2"></p>
            <a href="mailto:support@hitecmart.com">
              <p className="mb-0">support@hitecmart.com</p>
            </a>
          </div>

          <div
            className="col-md-4 text-center wow fadeInUp"
            data-wow-delay="0.4s"
          >
            <div className="btn-square mx-auto mb-3">
              <i className="fa fa-phone fa-2x text-danger"></i>
            </div>
            <p className="mb-2"></p>
            <a href="tel:9711811030">
              <p className="mb-0"> 9711811030</p>
            </a>
          </div>

          <div
            className="col-md-4 text-center wow fadeInUp"
            data-wow-delay="0.5s"
          >
            <div className="btn-square mx-auto mb-3">
              <i className="fa fa-map-marker-alt fa-2x text-danger"></i>
            </div>
            <p className="mb-2">
              Plot No.30, Rajiv Gandhi MIDC Rd, Phase 1, Hinjawadi Rajiv Gandhi
              Infotech Park, Hinjawadi,
            </p>
            <p className="mb-0"> Pune, Pimpri-Chinchwad, Maharashtra 411057 </p>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            {/* <h3 className="mb-4 font-medium">Submit the form we will get touch in you </h3>
                    <p className="mb-4">with in 24hr.</p> */}
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              name="google-sheet"
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="Name"
                      placeholder="Your Name"
                    />
                    <label for="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      name="Email"
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                    />
                    <label for="email">Your Email</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="phone"
                      className="form-control"
                      name="Phone"
                      id="name"
                      placeholder="Your Phone"
                    />
                    <label for="name">Your Phone</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="age"
                      id="email"
                      placeholder="Your Place"
                    />
                    <label for="email">Your Place</label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      name="Message"
                      placeholder="Leave a message here"
                      id="message"
                      style={{ height: "120px" }}
                    ></textarea>
                    <label for="message">Message</label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-danger py-3 px-5 bg-red-600"
                    type="submit"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="h-100">
              <iframe
                title="Google Map"
                className="w-100 rounded"
                src="//www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5844024054645!2d73.7326525!3d18.592766299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc385aeab8f%3A0x344941a044e88035!2s30%2C%20Rajiv%20Gandhi%20MIDC%20Rd%2C%20Phase%201%2C%20Hinjawadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411057!5e0!3m2!1sen!2sin!4v1709613731746!5m2!1sen!2sin"
                style={{ height: "100%", minHeight: "300px", border: 0 }}
                allowFullScreen
                aria-hidden={false}
                tabIndex={0}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
