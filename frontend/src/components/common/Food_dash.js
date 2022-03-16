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

const Food_dash = (props) => {
  let count = 1;
  const [edit , setEdit] = useState(false);
  const navigate = useNavigate();
  const [user_type, setuser_type] = useState("");
  const [name, setName] = useState("");
  const [shop_name, setshop_name] = useState(localStorage.getItem("shop_name"));
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
  const [item_rating, setitem_rating] = useState("0");
  const [item_addon, setitem_addon] = useState("");
  const [item_addon1, setitem_addon1] = useState("");
  const [item_addon2, setitem_addon2] = useState("");
  const [date, setDate] = useState(null);
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
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
// const onChangeitem_rating = (event) => {
//     setitem_rating(event.target.value);
// };
const onChangeitem_addon = (event) => {
    setitem_addon(event.target.value);
};
const onChangeitem_addon1 = (event) => {
  setitem_addon1(event.target.value);
};
const onChangeitem_addon2 = (event) => {
  setitem_addon2(event.target.value);
};
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});
  useEffect(() => {
    axios
      .get("/api/user")
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };
  
  const nav_to = (event) => {
    navigate(`/addfood`);
  };
  const delete_food = (event) => {
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const new_user = {
      _id : localStorage.getItem("_id"),
      shop_name : localStorage.getItem("shop_name"), 
      item_name : localStorage.getItem("item_name"),
      item_image,
      item_price,
      item_veg : localStorage.getItem("item_veg"),
      item_tag,
      item_rating,
      item_addon,
      item_addon1,
      item_addon2,
    };
    console.log(new_user);
    axios.post("/api/user/editfood", new_user).then((response) => {
      alert("Food Updated");
    });
    // window.location.reload();
  };
  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={nav_to}>
          ADD ITEM
        </Button>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Shop Name</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Addon - 1</TableCell>
                  <TableCell>Addon - 2</TableCell>
                  <TableCell>Addon - 3</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <>
                  {((user.item_status == undefined) && (user.shop_name === localStorage.getItem("shop_name")) && ((user.item_veg == "veg") || (user.item_veg == "non-veg"))) &&
                    <>
                    <TableRow key={ind}>
                      <TableCell>{count++}</TableCell>
                      <TableCell>{localStorage.getItem("shop_name")}</TableCell>
                      <TableCell>{user.item_name}</TableCell>
                      <TableCell>{user.item_veg}</TableCell>
                      <TableCell>{user.item_price}</TableCell>
                      <TableCell>
                        {/* <img src={user.item_image} width="100px" height="100px"/> */}
                        <p>{user.item_image}</p>
                      </TableCell>
                      <TableCell>{user.item_tag}</TableCell>
                      {/* <TableCell>{user.item_rating}</TableCell> */}
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
                      <TableCell>{user.item_addon}</TableCell>
                      <TableCell>{user.item_addon1}</TableCell>
                      <TableCell>{user.item_addon2}</TableCell>
                      <TableCell> <Button variant="contained" onClick={() =>{
                          // console.log(user._id);
                            localStorage.setItem("_id", user._id);
                            localStorage.setItem("item_name", user.item_name);
                            localStorage.setItem("shop_name", user.shop_name);
                            localStorage.setItem("item_image", user.item_image);
                            localStorage.setItem("item_price", user.item_price);
                            localStorage.setItem("item_veg", user.item_veg);
                            localStorage.setItem("item_tag", user.item_tag);
                            localStorage.setItem("item_rating", user.item_rating);
                            localStorage.setItem("item_addon", user.item_addon);
                            localStorage.setItem("item_addon1", user.item_addon1);
                            localStorage.setItem("item_addon2", user.item_addon2);
                            setEdit(true);
                            
                            console.log(edit);
                        }} > Edit</Button></TableCell>
                      <TableCell> <Button variant="contained" onClick={() =>{
                        axios
                          .post('/api/user/delfood',user)
                          .then((response) => {
                            alert("Deleted");
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                          // window.location.reload();
                        }} > Delete</Button></TableCell>
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
                label="VEG/NON-VEG"
                variant="outlined"
                defaultValue = {localStorage.getItem("item_veg")}
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
                value={item_price}
                defaultValue={localStorage.getItem("item_price")}
                onChange={onChangeitem_price}
                />
        </Grid>
        
        {/* <Grid item xs={12}> 
            <TextField
                label="Tags"
                variant="outlined"
                value={item_tag}
                defaultValue={localStorage.getItem("item_tag")}
                onChange={onChangeitem_tag}
                />
        </Grid> */}
        {/* <Grid item xs={12}> 
            <TextField
                label="Add-On"
                variant="outlined"
                value={item_addon}
                defaultValue={localStorage.getItem("item_addon")}
                onChange={onChangeitem_addon}
                />
        </Grid>
        <Grid item xs={12}> 
            <TextField
                label="Add-On"
                variant="outlined"
                value={item_addon1}
                defaultValue={localStorage.getItem("item_addon1")}
                onChange={onChangeitem_addon1}
                />
        </Grid>
        <Grid item xs={12}> 
            <TextField
                label="Add-On"
                variant="outlined"
                value={item_addon2}
                defaultValue={localStorage.getItem("item_addon2")}
                onChange={onChangeitem_addon2}
                />
        </Grid> */}

        <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
            UPDATE FOOD ITEM
            </Button>
        </Grid>
        </Grid>
      }
    </div>
  );
};


export default Food_dash; 
