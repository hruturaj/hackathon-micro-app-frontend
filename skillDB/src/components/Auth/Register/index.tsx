import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosRequest from "../../../services/http.service";

function Register() {
  const navigate = useNavigate();
  const initialValues: {
    name: string;
    email: string;
    password: string;
  } = {
    name: "",
    email: "",
    password: "",
  };
  const [registerForm, setRegisterForm] = useState(initialValues);
  const [registerErrors, setRegisterErrors] = useState(initialValues);
  const [formSubmit, setFormSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    validateForm(name, value);
    setRegisterForm((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = (name: string, value: string) => {
    const emailRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]{2,5}$/;
    const errors = registerErrors;
    if (name == "name") {
      errors.name = "";
      if (value.length < 1) {
        setRegisterErrors((prevState) => {
          return {
            ...prevState,
            name: "Name is Required",
          };
        });
      }
    }

    if (name == "email") {
      errors.email = "";
      if (value.length < 1) {
        setRegisterErrors((prevState) => {
          return {
            ...prevState,
            email: "Email is Required",
          };
        });
      } else if (!emailRegex.test(value.toLowerCase())) {
        setRegisterErrors((prevState) => {
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
        setRegisterErrors((prevState) => {
          return {
            ...prevState,
            password: "Password is Required",
          };
        });
      } else if (value.length < 8) {
        setRegisterErrors((prevState) => {
          return {
            ...prevState,
            password: "Password should be atleast 8 characters",
          };
        });
      }
    }
    return;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setFormSubmit(true);
    setLoading(true);
    const response: any = axiosRequest
      .post("signup", registerForm)
      .then(() => {
        //   localStorage.setItem("token", response.data.data.token);

        navigate("/auth/login");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
          <h2 style={{ textAlign: "center" }}>Register</h2>
          <form onSubmit={handleSubmit}>
            <Stack gap={5}>
              <Stack spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  name="name"
                  onBlur={handleChange}
                  onChange={handleChange}
                  placeholder="Name"
                  value={registerForm.name}
                  id="name"
                  label="Name"
                  variant="outlined"
                  error={registerErrors.name.length > 0}
                  helperText={registerErrors.name}
                />
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  onBlur={handleChange}
                  onChange={handleChange}
                  value={registerForm.email}
                  id="email"
                  placeholder="Email"
                  label="Email"
                  variant="outlined"
                  error={registerErrors.email.length > 0}
                  helperText={registerErrors.email}
                />
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  onBlur={handleChange}
                  onChange={handleChange}
                  placeholder="Password"
                  value={registerForm.password}
                  id="password"
                  label="Password"
                  variant="outlined"
                  error={registerErrors.password.length > 0}
                  helperText={registerErrors.password}
                />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                {/* <Divider /> */}
                <div>
                  Already a User? <Link to="/auth/login">LOGIN</Link>
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

export default Register;
