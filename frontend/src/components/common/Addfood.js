// import { useState } from "react";
import React, { useState } from 'react';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
// import { on } from "../../../../backend/models/Users";
import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

// import axios from 'axios';

const Addfood = (props) => {
    const Input = styled('input')({
        display: 'none',
      });
    const navigate = useNavigate();
    // get item from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const onUpdate = () => {
        if (user.user_type === "VENDOR") {
          setUser({
            name:user.name,
            shop_name:user.shop_name,
            canteen_open_time:user.canteen_open_time,
            canteen_close_time:user.canteen_close_time,
            phone_number:user.phone_number,
            password:user.password,
    }); 
} else {
        setUser({
            name:user.name,
            age:user.age,
            batch:user.batch,
            email:user.email,
            password:user.password,
        });
    }
};
    // const user = props.user;
    // const { user_info } = user;
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
    // const [item_tag, setitem_tag] = useState("");
    const [item_status, setitem_status] = useState("");
    const [item_rating, setitem_rating] = useState("0");
    const [item_ct, setitem_ct] = useState("0");
    const [item_addon, setitem_addon] = useState("");
    const [item_addon1, setitem_addon1] = useState("");
    const [item_addon2, setitem_addon2] = useState("");
    const [date, setDate] = useState(null);
    // const setItem 
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
    // const onChangeitem_tag = (event) => {
    //     setitem_tag(event.target.value);
    // };
    const onChangeitem_rating = (event) => {
        setitem_rating(event.target.value);
    };
    const onChangeitem_addon = (event) => {
        setitem_addon(event.target.value);
    };
    const onChangeitem_addon1 = (event) => {
        setitem_addon1(event.target.value);
    };
    const onChangeitem_addon2 = (event) => {
        setitem_addon2(event.target.value);
    };
    const onChangeitem_status = (event) => {
        setitem_status(event.target.value);
    };
    const onChangedate = (event) => {
        setDate(event.target.value);
    };

    const onChangeEmail = (event) => {
        setemail(event.target.value);
    };
    const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
    'HOT',
    'COLD',
    'SWEET',
    'SPICY',
  ];
  function getStyles(name, item_tag, theme) {
    return {
      fontWeight:
        item_tag.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
    const theme = useTheme();
    const [item_tag, setitem_tag] = React.useState([]);
  
    const onChangeitem_tag = (event) => {
      const {
        target: { value },
      } = event;
      setitem_tag(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    //   setitem_tag(event.target.value);
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
        setitem_rating("0");
        setitem_ct("0");
        setitem_addon("");
        setitem_addon1("");
        setitem_addon2("");
        setName("");
        setitem_status("");
        setemail("");
        setDate(null);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
        name: name,
        shop_name: localStorage.getItem("shop_name"),
        canteen_open_time : localStorage.getItem("canteen_open_time") ,
        canteen_close_time : localStorage.getItem("canteen_close_time"),
        item_name: item_name,
        item_veg: item_veg,
        item_image: item_image,
        item_price: item_price,
        item_tag: item_tag,
        item_rating: item_rating,
        item_ct: item_ct,
        item_addon: item_addon,
        item_addon1: item_addon1,
        item_addon2: item_addon2,
        item_status: "",
        date: Date.now(),
        };
        console.log(newUser);
        axios
        .post("/api/user/addfood", newUser)
        .then((response) => {
            // localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data);
            alert("Food Added!!!!");
            navigate("/Food_dash");
        }).catch(err => {
            console.log(err);
            alert("Failed!!!!");
        })

        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}> 
            <TextField
                label="shop_name"
                variant="outlined"
                defaultValue = {user.shop_name}
                inputProps={{ readOnly: true }}
                />
        </Grid>
        <Grid item xs={12}>
            <TextField
            label="Food Item Name"
            variant="outlined"
            value={item_name}
            onChange={onChangeitem_name}
            />
        </Grid>
        <Grid item xs={12}>
        <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Food Type</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Veg"
                    name="radio-buttons-group"
                    value={item_veg}
                    label="item_veg"
                    onChange={onChangeitem_veg}
                >
                    <FormControlLabel item_veg='veg' value="veg" control={<Radio />} label="Veg" />
                    <FormControlLabel item_veg='non-veg' value="non-veg" control={<Radio />} label="Non-Veg" />
                </RadioGroup>
        </FormControl>
        </Grid>

        <Grid item xs={12}> 
            <TextField
                label="Item Price"
                variant="outlined"
                value={item_price}
                onChange={onChangeitem_price}
                />
        </Grid>
        <Grid item xs={12}> 
            {/* <TextField
                label="Tags"
                variant="outlined"
                value={item_tag}
                onChange={onChangeitem_tag}
                />   */}
                <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">TAGS</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={item_tag}
          onChange={onChangeitem_tag}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, item_tag, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12}> 
                <FormControl sx={{width:100}}>
                <InputLabel id="demo-simple-select-label">Add-On</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={item_addon}
                label="Add-On"
                onChange={onChangeitem_addon}
                >
                <MenuItem value={"Extra Masala,10"}>Extra Masala,10</MenuItem>
                <MenuItem value={"Extra Cheese,10"}>Extra Cheese,10</MenuItem>
                <MenuItem value={"Mayo,20"}>Mayo, 20</MenuItem>
                </Select>
            </FormControl>
      </Grid>
      <Grid item xs={12}> 
      <FormControl sx={{width:100}}>
        <InputLabel id="demo-simple-select-label">Add-On</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item_addon1}
          label="Add-On"
          onChange={onChangeitem_addon1}
        >
          <MenuItem value={"Extra Masala,10"}>Extra Masala,10</MenuItem>
          <MenuItem value={"Extra Cheese,10"}>Extra Cheese,10</MenuItem>
          <MenuItem value={"Mayo,20"}>Mayo, 20</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12}> 
      <FormControl sx={{width:100}}>
        <InputLabel id="demo-simple-select-label">Add-On</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item_addon2}
          label="Add-On"
          onChange={onChangeitem_addon2}
        >
          <MenuItem value={"Extra Masala,10"}>Extra Masala,10</MenuItem>
          <MenuItem value={"Extra Cheese,10"}>Extra Cheese,10</MenuItem>
          <MenuItem value={"Mayo,20"}>Mayo, 20</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
            <input
                accept=".png, .jpg, .jpeg"
                id="contained-button-file"
                multiple = {false}
                type="file"
                value={item_image}
                // src=''
                onChange={onChangeitem_image}
            />

        </Grid>
         */}
        
        <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
            ADD FOOD ITEM
            </Button>
        </Grid>
        </Grid>
    );
};

export default Addfood;