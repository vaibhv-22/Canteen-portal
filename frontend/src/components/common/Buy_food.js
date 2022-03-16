import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import fuzzy from 'fuzzy';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
var bk = false; 
var dtime=false;

var yy1=0;
var yy2=0;
var yy3=0;


const Food_dash = (props) => {
  const [edit , setEdit] = useState(false);
  const [edit2 , setEdit2] = useState(false);
  const navigate = useNavigate();
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
  const [item_addon, setitem_addon] = useState("");
  const [item_addon1, setitem_addon1] = useState("");
  const [item_addon2, setitem_addon2] = useState("");
  const [item_quantity, setitem_quantity] = useState("1");
  const [item_status, setitem_status] = useState("");
  const [item_totalprice, setitem_totalprice] = useState("");
  const [date, setDate] = useState(null);
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [sortName2, setSortName2] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchshop, setSearchshop] = useState([]);
  const [amount, setAmount] = useState(0);
  const [userss, setUserss] = useState([]);
  const [min,setmin] = useState("");
  const [max,setmax] = useState("");
  const [total,settotal] = useState("");

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )};

  useEffect(() => {
    axios
      .get("/api/user")
      .then((response) => {
        setUserss(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const onChangeitem_name = (event) => {
    setitem_name(event.target.value);
};
const onChangebatch = (event) => {
    setbatch(event.target.value);
};
const onChangetotal = (event) => {
  settotal(event.target.value);
};
const onChangeitem_age = (event) => {
    setage(event.target.value);
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
const onChangeitem_addon = (event) => {
  if(yy1==0){
    setitem_addon(event.target.value);
    var arr = (event.target.value).split(",");
    var addonprice = arr[1];
    var tr = parseInt(total) + (parseInt(addonprice)*parseInt(item_quantity));
    settotal(tr);
    yy1=1;
  }
};
const onChangeitem_addon1 = (event) => {
  if(yy2==0){
    setitem_addon1(event.target.value);
    var arr = (event.target.value).split(",");
    var addonprice = arr[1];
    var tr = parseInt(total) + (parseInt(addonprice)*parseInt(item_quantity));
    settotal(tr);
    yy2=1;
  }
};
const onChangeitem_addon2 = (event) => {
  if(yy3==0){
    setitem_addon2(event.target.value);
    var arr = (event.target.value).split(",");
    var addonprice = arr[1];
    var tr = parseInt(total) + (parseInt(addonprice)*parseInt(item_quantity));
    settotal(tr);
    yy3=1;
  }
};
const onChangeitem_quantity = (event) => {
    setitem_quantity(event.target.value);
    var tr = Number(localStorage.getItem("item_price")) * Number(event.target.value);
    settotal(tr);
};
const onChangeitem_status = (event) => {
    setitem_status(event.target.value);
};
const onChangeamount = (event) => {
    setAmount(event.target.value);
};
const onChangesetmin = (event) => {
  setmin(event.target.value);
};
const onChangesetmax = (event) => {
  setmax(event.target.value);
  console.log(max);
};
const add_money = (event) => {
    setEdit2(true);
};


  useEffect(() => {
    axios
      .get("/api/user")
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText("");
        setSearchshop([]);
      })
      .catch((error) => {
        console.log(error);
      });
      const ordd = {
        email : localStorage.getItem("email"),
      }
      console.log(ordd);
    axios
      .post("/api/user/updatewalletlocal", ordd)
      .then((response) => {
        localStorage.setItem("wallet",response.data.wallet);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if(flag===true){
      return Number(a.item_price) < Number(b.item_price);
      } else{
        return Number(a.item_price) > Number(b.item_price);
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };
  const sortChange2 = () => {
    let usersTemp = users;
    const flag = sortName2;
    usersTemp.sort((a, b) => {
      if(flag===true){
        return Number(a.item_rating) < Number(b.item_rating);
        } else{
          return Number(a.item_rating) > Number(b.item_rating);
        }
    });
    setUsers(usersTemp);
    setSortName2(!sortName2);
  };
  const [vegfil, setvegfil] = React.useState('');
  const [tagfil, settagfil] = React.useState('');
  const vegfilter = (event) => {
    setvegfil(event.target.value);
  };
  const tagfilter = (event) => {
    settagfil(event.target.value);
  };
  // let min = 0;
  // let max = Infinity;
  
  const nav_to = (event) => {
    navigate(`/addfood`);
  };
  const delete_food = (event) => {
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
  
  const onSubmit = (event) => {
    
    event.preventDefault();
    const new_user = {
      name : localStorage.getItem("name"),
      batch : localStorage.getItem("batch"),
      age : localStorage.getItem("age"),
      food_id : localStorage.getItem("food_id"),
      shop_name : localStorage.getItem("shop_name"), 
      item_name : localStorage.getItem("item_name"),
      item_image,
      item_price : localStorage.getItem("item_price"),
      item_veg : item_veg,
      item_tag,
      canteen_open_time,
      canteen_close_time,
      item_rating,
      item_addon,
      item_addon1,
      item_addon2,
      item_quantity,
      item_totalprice : total,
      item_status: "Placed",
      buyer_mail : localStorage.getItem("email"),
      buyer_name : localStorage.getItem("name"),
      date : (new Intl.DateTimeFormat('en-IN', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())),
      
    };
    const new_user2 = {
      email : localStorage.getItem("email"),
      wallet : +localStorage.getItem("wallet") - +new_user.item_totalprice
    };
    console.log(new_user.item_totalprice);
    console.log(localStorage.getItem("wallet"));
    if(new_user.item_totalprice > localStorage.getItem("wallet")){
      alert("INSUFFICIENT BALANCE");
      // window.location.reload();
    } 
    else if(new_user.item_totalprice <= localStorage.getItem("wallet")){
      axios.post("/api/user/updatewallet", new_user2 ).then((response => {
        localStorage.setItem("wallet",new_user2.wallet);
      }))
      axios.post("/api/user/orderfood", new_user).then((response) => {
        alert("FOOD ORDER DONE");
        window.location = "/buy_myorders";
      });
    }
    // // console.log(new_user); 
    // if(new_user.item_totalprice <= localStorage.getItem("wallet")){
    // }
    // window.location.reload();
  };
  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  const name_select = (event) => {
    console.log(event.target.value);
    setSearchshop(event.target.value);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5} width={"100px"}    >
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Veg/Non-veg</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={vegfil}
    label="Veg/Non-veg"
    onChange={vegfilter} 
  >
    <MenuItem value={"veg"}>Veg</MenuItem>
    <MenuItem value={"non-veg"}>Non-veg</MenuItem>
  </Select>
</FormControl>
      {/* </Grid>
      <Grid item xs={12} md={5} width={"100px"}    > */}
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">TAGS FILTER</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={tagfil}
    label="HOT/COLD/SWEET/SPICY"
    onChange={tagfilter} 
  >
    <MenuItem value={"HOT"}>HOT</MenuItem>
    <MenuItem value={"COLD"}>COLD</MenuItem>
    <MenuItem value={"SWEET"}>SWEET</MenuItem>
    <MenuItem value={"SPICY"}>SPICY</MenuItem>
  </Select>
</FormControl>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Price
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                    value={min}
                    onChange={onChangesetmin}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                    value={max}
                    onChange={onChangesetmax}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            {/* <div>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange}
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
                      {users.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
            </div> */}
          </List>
        </Grid>
      </Grid>
      
      <Grid container>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="Available Balance" variant="outlined" value={localStorage.getItem("wallet")} inputProps={{readonly: true}}/>
        <Button variant="contained" color="primary" onClick={add_money}>
          ADD MONEY
        </Button>
        </Grid>
        { 
          edit2 &&
          <>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Enter Amount" variant="outlined" onChange={onChangeamount}/>
          </Grid>
          <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => {
            localStorage.setItem("amount", amount);
            localStorage.setItem("wallet", parseInt(localStorage.getItem("wallet")) + parseInt(amount));
            const new_user = {
              email : localStorage.getItem("email"),
              wallet : localStorage.getItem("wallet"),
            };
            axios.post("/api/user/addmoney", new_user).then((response) => {
              alert("MONEY ADDED");
              // window.location.reload();
          });
          }}>ADDDD </Button>
          </Grid>
          </>
        }
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Shop Name</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>{" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>Price</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>
                  <Button onClick={sortChange2}>
                      {sortName2 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>Rating</TableCell>
                  {/* <TableCell>Addon</TableCell> */}
                  <TableCell>Order Food</TableCell>
                  {/* <TableCell>Delete</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <>
                  {/* {console.log(searchshop)} */}

                  {( (user.item_tag.includes(tagfil)) && (user.item_veg === vegfil || vegfil === "") && (user.item_status == null) &&  ((user.item_veg == "veg") || (user.item_veg == "non-veg")) && ((Number(user.item_price) >= min) || min==="") && ((Number(user.item_price) <= max) || max==="") && fuzzy.test(searchText.toLowerCase(),user.item_name.toLowerCase())) &&
                    <>
                    <TableRow key={ind}>
                      <TableCell>{ind}</TableCell>
                      <TableCell>{user.shop_name}</TableCell>
                      <TableCell>{user.item_name}</TableCell>
                      <TableCell>{user.item_veg}</TableCell>
                      <TableCell>{user.item_price}</TableCell>
                      <TableCell>{user.item_tag}</TableCell>
                      {user.item_ct==="0"&&
                      <>
                      <TableCell><StyledRating
                        name="customized-color"
                        readOnly
                        defaultValue={0}
                        precision={0.25}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      /></TableCell>
                      {/* <TableCell>0</TableCell> */}
                      </>
                      } 
                      {user.item_ct>"0"&&
                      <>
                      <TableCell><StyledRating
                        name="customized-color"
                        readOnly
                        defaultValue={Math.round((user.item_rating/user.item_ct + Number.EPSILON) * 100) / 100}
                        precision={0.25}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      /></TableCell>
                      </>
                      }
                      

                      {/* <TableCell>{user.item_addon}</TableCell> */}
                      <TableCell> <Button variant="contained" onClick={() =>{
                            localStorage.setItem("food_id", user._id);
                            localStorage.setItem("item_name", user.item_name);
                            localStorage.setItem("shop_name", user.shop_name);
                            localStorage.setItem("item_price", user.item_price);
                            userss.forEach((lol) =>{
                              if(lol.shop_name===user.shop_name && bk===false){
                                // console.log(lol);
                              var dt = new Date();
                              var startTime = lol.canteen_open_time+":00";
                              var endTime = lol.canteen_close_time+":00";
                              console.log(startTime,endTime);
                              var s =  startTime.split(':');
                              var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
                              var e =  endTime.split(':');
                              var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
                              dtime =  (dt >= dt1 && dt <= dt2) ? true : false;
                              bk = true;
                              console.log(dt,dt1,dt2);
                            }})
                            if(dtime)
                            {
                              setEdit(true);
                              setitem_veg(user.item_veg);
                            }
                            else{
                              alert("Shop is closed!!!!!!!!!!")
                            }
                            // localStorage.setItem("item_status", "Placed");
                            console.log(edit);
                        }} > Order Item</Button></TableCell>
                      {/* <TableCell> <Button variant="contained" onClick={() =>{
                        axios
                          .post('/api/user/delfood',user)
                          .then((response) => {
                            alert("Deleted");
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                          window.location.reload();
                        }} > Delete</Button></TableCell> */}
                    </TableRow>
                    </>
                      }
                      </>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      {edit &&
        <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}> 
            <TextField
                label="shop_name"
                variant="outlined"
                defaultValue = {localStorage.getItem("shop_name")}
                inputProps={{ readOnly: true }}
                />
        </Grid>
        <Grid item xs={12}>
            <TextField
            label="Food Item Name"
            variant="outlined"
            defaultValue={localStorage.getItem("item_name")}
            inputProps={{ readOnly: true }}
            />
        </Grid>
        <Grid item xs={12}> 
            <TextField
                label="Item Price"
                variant="outlined"
                defaultValue={localStorage.getItem("item_price")}
                inputProps={{ readOnly: true }}
                // onChange={onChangeitem_price}
                />
        </Grid>
        {/* <Grid item xs={12}> 
            <TextField
                label="Add-On"
                variant="outlined"
                value={item_addon}
                onChange={onChangeitem_addon}
                />
        </Grid> */}
        <Grid item xs={12}>
        <Box sx={{ width: 300 }} align={{}}>
          <Slider
            label="Quantity"
            // defaultValue={1}
            value={item_quantity}
            valueLabelDisplay="auto"
            onChange={onChangeitem_quantity}
            step={1}
            marks
            min={1}
            max={10}
          />
          {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
      </Box>
      </Grid>
        <Grid item xs={12}> 
                <FormControl >
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
                <FormControl >
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
                <FormControl >
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
            <TextField
                label="Quantity"
                variant="outlined"
                value={item_quantity}
                onChange={onChangeitem_quantity}
                />
        </Grid> */}
        <Grid item xs={12}> 
            <TextField
                label="TOTAL COST"
                variant="outlined"
                value={total}
                inputProps={{ readOnly: true }}
                // onChange={onChangeitem_addon}
                />
        </Grid>

        <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
            PLACE ORDER
            </Button>
        </Grid>
        </Grid>
      }
    </div>
  );
};


export default Food_dash; 
