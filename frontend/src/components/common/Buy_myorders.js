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
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Visibility from "@mui/icons-material/Visibility";
const Vendor_orders = (props) => {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });
  const [ok,setok]=useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [rating,setrating] = useState("");
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
  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  const onchangerate = (event) => {
    setrating(event.target.value);
};

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
        {/* <Button onClick={console.log(users)}>LOL</Button> */}
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>Addon</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <>
                  {((user.item_quantity > 0) && user.buyer_mail === localStorage.getItem("email") ) &&
                    <>
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{user.item_name}</TableCell>
                    <TableCell>{user.item_veg}</TableCell>
                    <TableCell>{user.item_addon}</TableCell>
                    <TableCell>{user.item_quantity}</TableCell>
                    {/* <TableCell>{user.item_rating}</TableCell> */}
                    <TableCell>
                    { user.item_status === "Placed" && 
                        <>
                    <Button> Wait for the Vendor to Accept your order</Button>
                        </>
                    } 
                      { user.item_status === "Rejected" && 
                        <>
                        <Button variant="contained"> Rejected </Button>
                      </>
                      }
                      { user.item_status === "Accepted" && 
                        <>
                    <Button> Cooking</Button>
                        </>
                    }
                    { user.item_status === "Cooking" && 
                        <>
                    <Button> READY FOR PICKUP </Button>
                        </>
                    }
                    { user.item_status === "Ready for Pickup" && 
                        <>
                    <Button variant="contained" onClick={() =>{
                            const order={
                              id : user._id
                            };
                            // console.log(order);
                            axios
                            .post("/api/user/updatefoodordertocomplete", order)
                            .then((response) => {
                                // localStorage.setItem("user", JSON.stringify(response.data));
                                // console.log(response.data);
                            }).catch(err => {
                                console.log(err);
                                alert("Failed!!!!");
                            })
                            // window.location.reload();
                        }} > Picked Up</Button>
                        </>
                    }
                    {((user.item_rating!="1") && (user.item_status === "Completed") )&& 
                        <>
                    {/* <Button> Completed </Button> */}
                    <Typography component="legend">Leave your valuable feedback</Typography>
                    <StyledRating
                    label="Leave your valuable feedback"
                      name="customized-color"
                      // defaultValue={2}
                      getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                      precision={0.25}
                      onChange={onchangerate}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      onClick={()=>{
                        const fr_rating={
                          food_id : user.food_id,
                          item_rating: rating,
                        };
                        // console.log(fr_rating)
                        axios
                        .post("/api/user/updaterating", fr_rating)
                        .then((response) => {
                            // localStorage
                            // console.log(response.data);
                        }).catch((err) => {
                          console.log(err);
                        }
                        )
                        const order={
                          _id : user._id
                        }
                        axios
                        .post("/api/user/ratingdone", order)
                        .then((response) => {
                            // localStorage
                            console.log(response.data);
                        }).catch((err) => {
                          console.log(err);
                        }
                        )
                      }}
                    />
                    
                    {/* {user.item_rating==="1" && */}
                    {/* //  <Button >  Completed </Button> */}
                     {/* } */}
                        </>
                    }
                      {user.item_rating==="1" &&
                      <TableCell><Button>Completed</Button></TableCell>
                      }
                      </TableCell>
                    {/* <p>{user.item_rating} LOLOL</p> */}
                    {/* // delete that Table row*/}
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
      {/* <Grid item xs={12}>
        <Button variant="contained" color="primary">
          DELETE FOOD ITEM
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          EDIT FOOD ITEM
        </Button>
      </Grid> */}
    </div>
  );
};

export default Vendor_orders; 
