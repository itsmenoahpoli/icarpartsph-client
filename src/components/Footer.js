import React from "react";

const Footer = () => {
  return (
    <>
      <div className="mainFooter">
        <div className="row">
          <div className="col-lg-6">
            <h4>Our Location</h4>
            <small>Address</small>
            <p>17 Aurora Drive, Las Pinas, Manila, Metro Manila, Philippines</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.3173638893804!2d120.97876071537283!3d14.46645698422697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cdddf1dc8337%3A0xf7c53b2fd0a13dab!2s17%20Aurora%20Dr%2C%20Las%20Pinas%2C%20Manila%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1607029174100!5m2!1sen!2sph"
              width="500"
              height="350"
              frameborder="0"
              style={{ border: "0" }}
              tabIndex="0"
            ></iframe>
          </div>

          <div className="col-lg-6">
            <h4>Contact</h4>
          </div>
        </div>
      </div>
      <div className="bottomFooter">
        <small className="mb-0">
          © 2020 Bimmer Monekys. All Rights Reserved.
        </small>
      </div>
    </>
  );
};

export default Footer;
