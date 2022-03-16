import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import { linkClasses } from "@mui/material";
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

const Login = (props) => {
  const navigate = useNavigate();

  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const onChangepassword = (event) => {
    setpassword(event.target.value);
  };
  const onChangeEmail = (event) => {
    setemail(event.target.value);
  };

  const resetInputs = () => {
    setpassword("");
    setemail("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    axios
      .post("/api/user/login", newUser)
      .then((response) => {
        // alert(response.data.alertt);
        const resp = response.data;
        console.log(resp);
        if (resp.hasOwnProperty('alertt')) {
          alert(resp.alertt)
        } else {
          console.log(resp);
          alert(resp.name + ", you have logged in!!")
          // send to profile page
          // save user to local storage
          // localStorage.setItem("access-token", resp);
          localStorage.setItem("user", JSON.stringify(resp));
          localStorage.setItem("shop_name", resp.shop_name);
          localStorage.setItem("batch",resp.batch);
          localStorage.setItem("age",resp.age);
          localStorage.setItem("curcount",resp.curcount);
          localStorage.setItem("wallet",resp.wallet);
          localStorage.setItem("email",resp.email);
          localStorage.setItem("canteen_open_time",resp.canteen_open_time);
          localStorage.setItem("canteen_close_time",resp.canteen_close_time);
          navigate("/profile");
        }
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
            <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
            />
        </Grid>
        <Grid item xs={12}>
            {/* <TextField
            label="password"
            variant="outlined"
            value={password}
            onChange={onChangepassword}
            /> */}
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={onChangepassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </Grid>
        
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;