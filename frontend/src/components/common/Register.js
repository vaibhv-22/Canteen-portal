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
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

const Register = (props) => {
  const [user_type, setuser_type] = useState("");
  const [name, setName] = useState("");
  const [shop_name, setshop_name] = useState("");
  const [canteen_open_time, setcanteen_open_time] = useState("");
  const [canteen_close_time, setcanteen_close_time] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setpassword] = useState("");
  const [age, setage] = useState("");
  const [batch, setbatch] = useState("");
  const [email, setemail] = useState("");
  const [item_name, setitem_name] = useState("");
  const [item_image, setitem_image] = useState("");
  const [item_price, setitem_price] = useState("");
  const [item_veg, setitem_veg] = useState("");
  const [item_tag, setitem_tag] = useState("");
  const [item_rating, setitem_rating] = useState("");
  const [item_ct, setitem_ct] = useState("");
  const [item_addon, setitem_addon] = useState("");
  const [date, setDate] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
  const onChangeuser_type = (event) => {
    setuser_type(event.target.value);
  };
  const onChangeshop_name = (event) => {
    setshop_name(event.target.value);
  };
  const onChangecanteen_open_time = (event) => {
    setcanteen_open_time(event.target.value);
  };
  const onChangecanteen_close_time = (event) => {
    setcanteen_close_time(event.target.value);
  };
  const onChangephone_number = (event) => {
    setphone_number(event.target.value);
  };
  const onChangepassword = (event) => {
    setpassword(event.target.value);
  };
  const onChangeage = (event) => {
    setage(event.target.value);
  };
  const onChangebatch = (event) => {
    setbatch(event.target.value);
  };
  const onChangeemail = (event) => {
    setemail(event.target.value);
  };
  const onChangeitem_name = (event) => {
    setitem_name(event.target.value);
  };
  const onChangeitem_image = (event) => {
    setitem_image(event.target.value);
  };
  const onChangeitem_price = (event) => {
    setitem_price(event.target.value);
  };
  const onChangeitem_veg = (event) => {
    setitem_veg(event.target.value);
  };
  const onChangeitem_tag = (event) => {
    setitem_tag(event.target.value);
  };
  const onChangeitem_rating = (event) => {
    setitem_rating(event.target.value);
  };
  const onChangeitem_ct = (event) => {
    setitem_ct(event.target.value);
};
  const onChangeitem_addon = (event) => {
    setitem_addon(event.target.value);
  };
  const onChangedate = (event) => {
    setDate(event.target.value);
  };

  const onChangeEmail = (event) => {
    setemail(event.target.value);
  };

  const resetInputs = () => {
    setuser_type("");
    setshop_name("");
    setcanteen_open_time("");
    setcanteen_close_time("");
    setphone_number("");
    setpassword("");
    setage("");
    setbatch("");
    setitem_name("");
    setitem_price("");
    setitem_image("");
    setitem_veg("");
    setitem_tag("");
    setitem_rating("");
    setitem_ct("");
    setitem_addon("");
    setName("");
    setemail("");
    setDate(null);
  };
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

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      user_type: user_type,
      shop_name: shop_name,
      canteen_open_time: canteen_open_time,
      canteen_close_time: canteen_close_time,
      phone_number: phone_number,
      password: password,
      age: age,
      batch: batch,
      item_name: item_name,
      item_veg: item_veg,
      item_image: item_image,
      item_price: item_price,
      item_tag: item_tag,
      item_rating: item_rating,
      item_ct: item_ct,
      item_addon: item_addon,
      date: Date.now(),
    };

    axios
      .post("/api/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
        window.location = "/login";
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact number"
          variant="outlined"
          value={phone_number}
          onChange={onChangephone_number}
        />
      </Grid>
      
      <Grid item xs={12}> 
        <FormControl sx={{m: 1, minWidth: 225}}>
        <InputLabel id="demo-simple-select-label">USER</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"

          value={user_type}
          label="user_type"
          onChange={onChangeuser_type}
        >
          <MenuItem value={'Vendor'}>Vendor</MenuItem>
          <MenuItem value={'Buyer'}>Buyer</MenuItem>
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      </Grid>
      {
        user_type === 'Vendor' &&
        <>
          <Grid item xs={12}> 
            <TextField
              label="Shop Name"
              variant="outlined"
              value={shop_name}
              onChange={onChangeshop_name}
            />
          </Grid>
          <Grid item xs={12}> 
            <TextField
              label="Canteen Open Time"
              variant="outlined"
              value={canteen_open_time}
              onChange={onChangecanteen_open_time}
            />
          </Grid>
          <Grid item xs={12}> 
            <TextField
              label="Canteen Close Time"
              variant="outlined"
              value={canteen_close_time}
              onChange={onChangecanteen_close_time}
            />
          </Grid>
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
        </>
      }
      {
        user_type === 'Buyer' &&
        <>
          <Grid item xs={12}> 
          <FormControl sx={{m: 1, minWidth: 100}}>
            <InputLabel id="demo-simple-select-label">BATCH</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"

              value={batch}
              label="batch"
              onChange={onChangebatch}
            >
              <MenuItem value={'UG1'}>UG1</MenuItem>
              <MenuItem value={'UG2'}>UG2</MenuItem>
              <MenuItem value={'UG3'}>UG3</MenuItem>
              <MenuItem value={'UG4'}>UG4</MenuItem>
              <MenuItem value={'UG5'}>UG5</MenuItem>
              {/* <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}> 
            <TextField
              label="AGE"
              variant="outlined"
              value={age}
              onChange={onChangeage}
            />
          </Grid>
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
        </>
      }
      
      {/* <Grid item xs={12}> 
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shop_name}
          onChange={onChangeshop_name}
        />
      </Grid> */}

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;