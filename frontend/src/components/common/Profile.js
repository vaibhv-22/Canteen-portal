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
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    const navigate = useNavigate();
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
    const [item_tag, setitem_tag] = useState("");
    const [item_rating, setitem_rating] = useState("");
    const [item_ct, setitem_ct] = useState("");
    const [item_addon, setitem_addon] = useState("");
    const [date, setDate] = useState(null);
    // const setItem 
    const onChangename = (event) => {
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

        navigate("/profedit");
    };

    return (
        <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
            <TextField
            label="Name"
            variant="outlined"
            // user name in default value
            defaultValue = {user.name}
            // onChange={onChangename}
            inputProps={
					{ readOnly: true, }
            }
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
            label="Contact number"
            variant="outlined"
            // user name in default value
            defaultValue = {user.phone_number}
            inputProps={
                    { readOnly: true, }
            }
            // onChange={onChangephone_number}
            />
        </Grid>
        
        <Grid item xs={12}> 
            <TextField
                label="user_type"
                variant="outlined"
                defaultValue={user.user_type}
                inputProps= {{ readOnly: true, }}
                />
        </Grid>
        {
            user.user_type === 'Vendor' &&
            <>
            <Grid item xs={12}> 
                <TextField
                label="Shop Name"
                variant="outlined"
                defaultValue={user.shop_name}
                inputProps={{ readOnly: true, }}
                />
            </Grid>
            <Grid item xs={12}> 
                <TextField
                label="Canteen Open Time"
                variant="outlined"
                defaultValue={user.canteen_open_time}
                inputProps={{ readOnly: true, }}
                />
            </Grid>
            <Grid item xs={12}> 
                <TextField
                label="Canteen Close Time"
                variant="outlined"
                defaultValue={user.canteen_close_time}
                inputProps={{ readOnly: true, }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Email"
                variant="outlined"
                defaultValue={user.email}
                inputProps={{ readOnly: true, }}
                />
            </Grid>
        <Grid item xs={12}>
            <TextField
            label="password"
            variant="outlined"
            value={user.password}
            inputProps={{ readOnly: true, }}
            />
        </Grid>
            </>
        }
        {
            user.user_type === 'Buyer' &&
            <>
            <Grid item xs={12}> 
            <TextField
                label="batch"
                variant="outlined"
                defaultValue={user.batch}
                inputProps= {{ readOnly: true, }}
                />
            </Grid>
            <Grid item xs={12}> 
                <TextField
                label="AGE"
                variant="outlined"
                defaultValue={user.age}
                inputProps= {{ readOnly: true, }}
                />
            </Grid>
            <Grid item xs={12}>
            <TextField
            label="Email"
            variant="outlined"
            defaultValue={user.email}
            inputProps={{ readOnly: true, }}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
            label="password"
            variant="outlined"
            defaultValue={user.password}
            inputProps={{ readOnly: true, }}
            
            />
        </Grid>
            </>
        }

        <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
            EDIT PROFILE
            </Button>
        </Grid>
        </Grid>
    );
};

export default Profile;