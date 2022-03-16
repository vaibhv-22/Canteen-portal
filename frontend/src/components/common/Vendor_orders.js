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
import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';
init("user_xUyzk0eGFv1emH0ZBnd0K");


const Vendor_orders = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  // const [cor] = useState(0);
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
                  <TableCell>Addon - 1</TableCell>
                  <TableCell>Addon - 2</TableCell>
                  <TableCell>Addon - 3</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <>
                  { ((user.shop_name === localStorage.getItem("shop_name")) && (user.item_quantity > 0)) &&
                    <>
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{user.item_name}</TableCell>
                    <TableCell>{user.item_veg}</TableCell>
                    <TableCell>{user.item_addon}</TableCell>
                    <TableCell>{user.item_addon1}</TableCell>
                    <TableCell>{user.item_addon2}</TableCell>
                    <TableCell>{user.item_quantity}</TableCell>
                    <TableCell>{user.date}</TableCell>
                    <TableCell>
                    { user.item_status === "Placed" && 
                        <>
                    <Button variant="contained" onClick={() =>{
                            const order={
                              id : user._id
                            };
                            const updatecurcount={
                              curcount : +localStorage.getItem("curcount")+1,
                              mailid : localStorage.getItem("user").email 
                            };
                            // console.log(updatecurcount);
                            if(localStorage.getItem("curcount") < 10){
                                  
                                axios 
                                .post("/api/user/updatecountfororder", updatecurcount)
                                .then((response) => {
                                  localStorage.setItem("curcount",+localStorage.getItem("curcount")+1); 
                                    console.log(response.data);
                                }).catch(err => {
                                    console.log(err);
                                    alert("Failed!!!!");
                                })  
                                axios
                                .post("/api/user/updatefoodordertoaccept", order)
                                .then((response) => {
                                    console.log(response.data);
                                    // emailjs.send("service_34vma9a","template_pyqu8xg",{
                                      emailjs.send("service_pdgz3pq","template_dpqhkyu",{
                                      // emailjs.send("service_5fdf9ud","template_zf2sm8w",{
                                      from_name: localStorage.getItem("shop_name"),
                                      to_name: response.data.buyer_name,
                                      message: "YOUR ORDER IS ACCEPTED",
                                      })
                                      .then((result) => {
                                        // window.location.reload();
                                        console.log(result.text);
                                    }, (error) => {
                                        console.log(error.text);
                                    });
                                }).catch(err => {
                                    console.log(err);
                                    alert("Failed!!!!");
                                })      
                              } else if(localStorage.getItem("curcount") >= 10){
                                localStorage.getItem("curcount") >= 10 &&
                                alert("You have reached the maximum order limit!!!")
                                // window.location.reload();
                              }               
                        }} > Accept</Button>
                        </>
                    }
                        {/* Give some gap */}
                        <p>&nbsp;</p>
                        { user.item_status === "Placed" && 
                        <>
                      <Button variant="contained" onClick={() =>{
                            const order={
                              id : user._id,
                              buyer_mail : user.buyer_mail,
                              amount: user.item_price*user.item_quantity
                            };
                            
                            axios
                            .post("/api/user/updatefoodordertoreject", order)
                            .then((response) => {
                                // localStorage.setItem("user", JSON.stringify(response.data));
                                console.log(response.data);
                                // emailjs.send("service_34vma9a","template_pyqu8xg",{
                                  // emailjs.send("service_5fdf9ud","template_zf2sm8w",{
                                  emailjs.send("service_pdgz3pq","template_dpqhkyu",{
                                  from_name: localStorage.getItem("shop_name"),
                                  to_name: response.data.buyer_name,
                                  message: "YOUR ORDER IS REJECTED",
                                  }).then((result) => {
                                    // window.location.reload();
                                    console.log(result.text);
                                }, (error) => {
                                    console.log(error.text);
                                });
                            }).catch(err => {
                                console.log(err);
                                alert("Failed!!!!");
                            })
                            axios
                            .post("/api/user/returnmoney", order)
                            .then((response) => {
                              // localStorage.setItem("wallet",response.data.wallet);
                                // localStorage.setItem("user", JSON.stringify(response.data));
                                console.log(response.data);
                            }).catch(err => {
                                console.log(err);
                                alert("Failed!!!!");
                            })
                            // window.location.reload();
                        }} > Reject</Button>
                      </>
                      }
                      { user.item_status === "Rejected" && 
                        <>
                        <Button variant="contained"> Rejected </Button>
                      </>
                      }
                      { user.item_status === "Accepted" && 
                        <>
                    <Button variant="contained" onClick={() =>{
                            const order={
                              id : user._id
                            };
                            axios
                            .post("/api/user/updatefoodordertocooking", order)
                            .then((response) => {
                                // localStorage.setItem("user", JSON.stringify(response.data));
                                console.log(response.data);
                            }).catch(err => {
                                console.log(err);
                                alert("Failed!!!!");
                            })
                            // window.location.reload();
                        }} > Cooking</Button>
                        </>
                    }
                    { user.item_status === "Cooking" && 
                        <>
                    <Button variant="contained" onClick={() =>{
                            const order={
                              id : user._id
                            };
                            const updatecurcount={
                              curcount : +localStorage.getItem("curcount")-1,
                              mailid : localStorage.getItem("user").email 
                            };
                            axios
                            .post("/api/user/updatefoodordertoready", order)
                            .then((response) => {
                                // localStorage.setItem("user", JSON.stringify(response.data));
                                console.log(response.data);
                            }).catch(err => {
                                console.log(err);
                                alert("Failed!!!!");
                            })
                            axios   
                                .post("/api/user/updatecountfororder", updatecurcount)
                                .then((response) => {
                                  localStorage.setItem("curcount",+localStorage.getItem("curcount")-1); 
                                    console.log(response.data);
                                }).catch(err => {
                                    console.log(err);
                                    alert("Failed!!!!");
                                })
                            // window.location.reload();
                        }} > READY FOR PICKUP </Button>
                        </>
                    }
                    { user.item_status === "Ready for Pickup" && 
                        <>
                    <Button variant="contained"> READY FOR PICKUP </Button>
                        </>
                    }
                    { user.item_status === "Completed" && 
                        <>
                    <Button> Completed </Button>
                        </>
                    }
                      </TableCell>
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
