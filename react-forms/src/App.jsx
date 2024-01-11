import React, { useState } from "react";
import "./App.css";

function App() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    // First Name validation
    if (!formValues.fname) {
      errors.fname = "Please enter your First Name";
    } else {
      errors.fname = "";
    }

    // Last Name validation
    if (!formValues.lname) {
      errors.lname = "Please enter your Last Name";
    } else {
      errors.lname = "";
    }

    // Email validation
    if (!formValues.email) {
      errors.email = "Please enter your Email";
    } else {
      errors.email = "";
    }

    // Phone Number validation
    if (!formValues.phone) {
      errors.phone = "Please enter your Phone Number";
    } else if (!/^\d{10}$/.test(formValues.phone)) {
      errors.phone = "Invalid phone number. Must be 10 digits.";
    } else {
      errors.phone = "";
    }

    // Set errors and proceed or display errors
    setFormErrors(errors);
    if (Object.values(errors).every((err) => err === "")) {
      setRegistrationSuccess(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const closePopup = () => {
    setRegistrationSuccess(false);
  };

  return (
    <div id="container">
      <div className="form">
        <form action="/submit_form" method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Enter your First name"
            value={formValues.fname}
            onChange={handleChange}
          />
          <span className="error">{formErrors.fname}</span>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Enter your Last name"
            value={formValues.lname}
            onChange={handleChange}
          />
          <span className="error">{formErrors.lname}</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={formValues.email}
            onChange={handleChange}
          />
          <span className="error">{formErrors.email}</span>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your mobile number (10 digits)"
            maxLength="10"
            value={formValues.phone}
            onChange={handleChange}
          />
          <span className="error">{formErrors.phone}</span>
          <input type="submit" value="Register" />
        </form>
      </div>
      {registrationSuccess && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <p>Registration successful!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;