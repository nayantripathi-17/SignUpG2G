import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect } from "react";

function Email() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingBusiness, setLoadingBusiness] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifiedBusiness, setVerifiedBusiness] = useState(false);
  const [checked, setChecked] = useState(false);

  const [json, setJson] = useState("");

  const [wrongPass, setWrongPass] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);

  useEffect(() => {
    if (!wrongEmail && !wrongPass && checked) setVerified(true);
  }, [setVerified, wrongEmail, wrongPass, checked]);
  //func handleEmailChange
  const handleEmailChange = (_evt) => {
    setEmail(_evt.target.value);
  };

  const handleSubmitUser = async (_evt) => {
    _evt.preventDefault();
    setLoading(true);

    const res = await (
      await fetch(
        `/api/emailUniqueCheck?email=${String(email).toLowerCase()}`,
        {
          method: "GET",
        }
      )
    ).json();

    if (res.unique) {
      setWrongEmail(false);
      if (
        _evt.target.elements.password.value !==
        _evt.target.elements.confirmPassword.value
      ) {
        setWrongPass(true);
      } else {
        setJson(
          JSON.stringify({
            email: String(email).toLowerCase(),
            password: _evt.target.elements.password.value,
            name: `${_evt.target.elements.firstName.value} ${_evt.target.elements.lastName.value}`,
          })
        );
        setChecked(true);
        setWrongPass(false);
      }
    } else {
      setWrongEmail(true);
    }
    setLoading(false);
  };

  const handleSubmitBusiness = async (_evt) => {
    _evt.preventDefault();
    setLoadingBusiness(true);

    const res2 = await fetch(`/api/addUser`, {
      method: "POST",
      body: json
    });

    const res = await fetch(`/api/addBusiness`, {
      method: "POST",
      body: JSON.stringify({
        email: String(email).toLowerCase(),
        companyName: _evt.target.elements.companyName.value,
        address: _evt.target.elements.address.value,
        contact: _evt.target.elements.contact.value,
        website: _evt.target.elements.website.value,
        industry: _evt.target.elements.industry.value,
        workforce: _evt.target.elements.workforce.value,
        description: _evt.target.elements.description.value,
      }),
    });
    setVerifiedBusiness(true);
    setLoadingBusiness(false);
  };

  return (
    <div className="items-center">
      <h1 className="font-bold text-4xl md:text-6xl my-10">
        Let&apos;s build from here, together.
      </h1>
      {verified ? (
        <>
          <form onSubmit={handleSubmitBusiness} method="POST">
            <div className="flex flex-col space-y-4 space-x-0 items-center md:items-center md:space-y-0 md:flex-row md:space-x-4"></div>
            <div className="my-5 space-x-5">
              <TextField
                placeholder="Company Name"
                type="text"
                className="w-1/3"
                required
                name="companyName"
              />
              <TextField
                placeholder="Address"
                type="text"
                className="w-1/3"
                required
                name="address"
              />
            </div>
            <div className="my-5 space-x-5">
              <TextField
                placeholder="Contact Number"
                type="text"
                className="w-1/3"
                required
                name="contact"
              />
              <TextField
                placeholder="Website"
                type="text"
                className="w-1/3"
                required
                name="website"
              />
            </div>
            <div className="my-5 space-x-5">
              <TextField
                placeholder="Industry"
                type="text"
                className="w-1/3"
                required
                name="industry"
              />
              <TextField
                placeholder="Current Workforce"
                type="number"
                className="w-1/3"
                required
                name="workforce"
              />
            </div>
            <div className="my-5">
              <TextField
                placeholder="Description"
                type="number"
                className="w-full"
                required
                name="description"
                multiline
                rows="4"
              />
            </div>
            <div className="flex">
              <LoadingButton
                loading={loadingBusiness}
                className="bg-green-700 hover:bg-green-600 rounded-md w-1/4 text-center normal-case text-white font-bold text-lg tracking-wide"
                disableRipple
                type="submit"
              >
                {verifiedBusiness ? <CheckIcon /> : "Add Business"}
              </LoadingButton>
            </div>
          </form>
        </>
      ) : (
        <form onSubmit={handleSubmitUser} method="POST">
          <div className="flex flex-col space-y-4 space-x-0 items-center md:items-center md:space-y-0 md:flex-row md:space-x-4 ">
            <TextField
              placeholder="Email Address"
              type="email"
              className="w-3/4"
              value={email}
              onChange={handleEmailChange}
              required
              name="email"
              error={wrongEmail}
              helperText={
                wrongEmail ? "This email is either invalid or taken" : ""
              }
            />
          </div>
          <div className="my-5 space-x-5">
            <TextField
              placeholder="Password"
              type="password"
              className="w-1/4"
              required
              name="password"
              error={wrongPass}
              helperText={wrongPass ? "Entered Passwords do not match" : ""}
            />
            <TextField
              placeholder="Confirm Password"
              type="password"
              className="w-1/4"
              required
              name="confirmPassword"
            />
          </div>
          <div className="my-5 space-x-5">
            <TextField
              placeholder="First Name"
              type="text"
              className="w-1/4"
              required
              name="firstName"
            />
            <TextField
              placeholder="Last Name"
              type="text"
              className="w-1/4"
              required
              name="lastName"
            />
          </div>
          <div className="flex">
            <LoadingButton
              loading={loading}
              className="bg-green-700 hover:bg-green-600 rounded-md w-1/4 text-center normal-case text-white font-bold text-lg tracking-wide"
              disableRipple
              type="submit"
            >
              {verified ? <CheckIcon /> : "Verify"}
            </LoadingButton>
          </div>
        </form>
      )}
    </div>
  );
}

export default Email;
