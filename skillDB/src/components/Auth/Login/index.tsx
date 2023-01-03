import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axiosRequest from "../../../services/http.service";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function Login() {
  const navigate = useNavigate();

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initialValues);
  const [loginErrors, setLoginErrors] = useState(initialValues);
  const [formSubmit, setFormSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  // set form value on change
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    validateForm(name, value);
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // form validation
  const validateForm = (name: string, value: string) => {
    const emailRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]{2,5}$/;
    const errors = loginErrors;
    if (name == "email") {
      errors.email = "";
      if (value.length < 1) {
        setLoginErrors((prevState) => {
          return {
            ...prevState,
            email: "Email is Required",
          };
        });
      } else if (!emailRegex.test(value.toLowerCase())) {
        setLoginErrors((prevState) => {
          return {
            ...prevState,
            email: "Email is Invalid",
          };
        });
      }
    }

    if (name == "password") {
      errors.password = "";
      if (value.length < 1) {
        setLoginErrors((prevState) => {
          return {
            ...prevState,
            password: "Password is Required",
          };
        });
        // errors.password = 'Password is Required';
      } else if (value.length < 8) {
        setLoginErrors((prevState) => {
          return {
            ...prevState,
            password: "Password should be atleast 8 characters",
          };
        });
        // errors.password = 'Password should be a minimum of 8 characters';
      }
    }
    return;
  };

  // submit login form
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // setLoginErrors(validateForm(loginForm));
    setFormSubmit(true);
    console.log(loginForm);
    setLoading(true);
    const response: any = axiosRequest
      .post("login", loginForm)
      .then((response) => {
        if (response.status === 200) {
          setLoading(true);

          console.log(response);
          localStorage.setItem("token", response.data.data.token);
          navigate("/add-skills");
        } else {
          setLoading(true);
        }
      });
    console.log(response);
  };

  return (
    // <Grid
    //   container
    //   spacing={0}
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="center"
    //   style={{ minHeight: "100vh" }}

    // >
    <div
      style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}
    >
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <Stack gap={5}>
              <Stack spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  onBlur={handleChange}
                  onChange={handleChange}
                  value={loginForm.email}
                  id="email"
                  placeholder="Email"
                  label="Email"
                  variant="outlined"
                  error={loginErrors.email.length > 0}
                  helperText={loginErrors.email}
                />

                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  onBlur={handleChange}
                  onChange={handleChange}
                  placeholder="Password"
                  value={loginForm.password}
                  id="password"
                  label="Password"
                  variant="outlined"
                  error={loginErrors.password.length > 0}
                  helperText={loginErrors.password}
                />

                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Divider />
                <div>
                  Dont't have an account?{" "}
                  <Link to="/auth/register">REGISTER</Link>
                </div>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
      {loading && (
        <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
    </div>
    // </Grid>
  );
}

export default Login;
