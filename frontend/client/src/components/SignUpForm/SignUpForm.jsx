import React, { useState } from "react";
import "./SignUpForm.css";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    country: "",
    city: "",
    languages: [],
  });

  const languagesOptions = [
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "Ruby",
    "PHP",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        languages: checked
          ? [...prevState.languages, value]
          : prevState.languages.filter((lang) => lang !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="sign-up-container container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                className="form-control"
                id="bio"
                name="bio"
                rows="3"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <fieldset className="form-group">
              <legend>Programming Languages</legend>
              {languagesOptions.map((language) => (
                <div className="form-check" key={language}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={language}
                    name="languages"
                    value={language}
                    checked={formData.languages.includes(language)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={language}>
                    {language}
                  </label>
                </div>
              ))}
            </fieldset>

            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
