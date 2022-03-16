import { useState, useEffect } from "react";
import React from "react";
// import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
// import {
//   Break,
// } from 'devextreme-react/chart';
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Bar } from "react-chartjs-2";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Menu } from "@mui/material";
import { display, width } from "@mui/system";

const UsersList = (props) => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const frq = new Map();
  const cnt = new Map();
  const batch_completed = new Map();
  const age_completed = new Map();
  let data = [];
  let data2 = [];
  // const data2 = [
  //   { argument: 'Monday', value: 30 },
  //   { argument: 'Tuesday', value: 20 },
  //   { argument: 'Wednesday', value: 10 },
  //   { argument: 'Thursday', value: 50 },
  //   { argument: 'Friday', value: 60 },
  // ];
  let order_placed = 0;
  let order_completed = 0;
  let order_pending = 0;
  useEffect(() => {
    axios
      .get("/api/user")
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText("");
        users.forEach((user) => {
          if( user.shop_name == localStorage.getItem("shop_name") && user.item_status!="") order_placed++;
          if( user.shop_name == localStorage.getItem("shop_name") && user.item_status=="Completed") order_completed++;
          if( user.shop_name == localStorage.getItem("shop_name") && (user.item_status=="Cooking" || user.item_status=="Ready for Pickup")) order_pending++;
        });
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

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Order Placed</TableCell>
                  <TableCell>Order Pending</TableCell>
                  <TableCell>Completed Orders</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
             
                {
                    users.forEach((user) => {
                    if( user.shop_name == localStorage.getItem("shop_name") &&  user.item_status!="" && user.item_status!=null) order_placed++;
                    if( user.shop_name == localStorage.getItem("shop_name") && user.item_status=="Completed") order_completed++;
                    if( user.shop_name == localStorage.getItem("shop_name") && user.item_status=="Cooking" || user.item_status=="Ready for Pickup") order_pending++;
                    
                    // console.log(localStorage.getItem("shop_name"));
                    // console.log(user.batch);
                    // console.log(user.shop_name);
                    if( user.shop_name == localStorage.getItem("shop_name") && user.item_status=="Completed") {
                      const t = batch_completed.get(user.batch);
                      batch_completed.set(user.batch , (t === undefined ? 0: t)+1);
                      data.push({
                        argument: user.batch,
                        value: batch_completed.get(user.batch)
                      });
                    }
                    if( user.shop_name == localStorage.getItem("shop_name") && user.item_status=="Completed") {
                      const a = age_completed.get(user.age);
                      age_completed.set(user.age , (a === undefined ? 0: a)+1);
                      data2.push({
                        argument: user.age,
                        value: age_completed.get(user.age)
                      });
                    }

                  })
                    
            }
                <TableRow>
                    {/* <TableCell>{ind}</TableCell> */}
                    <TableCell>{order_placed}</TableCell>
                    <TableCell>{order_pending}</TableCell>
                    <TableCell>{order_completed}</TableCell>
                  </TableRow>



              </TableBody>
            </Table>
          </Paper>
          <p style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>TOP 5 ITEMS ON MY SHOP</p>
        </Grid>

        <br></br>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Food Name</TableCell>
                  <TableCell>No. of Orders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                { 
                users.forEach((user) => {
                  const t = frq.get(user.item_name);
                  if(user.shop_name == localStorage.getItem("shop_name") && user.item_name!="") frq.set(user.item_name , (t === undefined ? 0: t)+1);
                }
                )}
                
                {
                  ( Array
                    .from(frq.entries(), ([k, v]) => [k, v])).sort((a,b) =>  (b[1] - a[1]))
                    .filter((val, i)=> {if (i < 5) return val;})
                    .map((ele) => (
                      <TableRow>
                      <TableCell>{ele[0]}</TableCell>
                      <TableCell>{ele[1]}</TableCell>
                      <TableCell>
                      
                      </TableCell>
                    </TableRow>)
                    )
                  
                }

              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    <Grid container align={"center"}>
    <Grid item xs ={6}>
        <p align='center'>&emsp; BATCH VS ORDERS COMPLETED</p>
    <Chart style={{ height: "100px" , width : "500px", alignContent: "center"}} data={data}>
      <ArgumentAxis>
        </ArgumentAxis>
      <ValueAxis>
      scale name="discrete"
        discreteTicks
        discreteTickCount={5}
        discreteTickStep={10}
        </ValueAxis>
      <BarSeries valueField="value" argumentField="argument" />
    </Chart>
    </Grid>
    <Grid item xs ={6}><p align='center'>AGE VS ORDERS COMPLETED</p>
    <Chart style={{ height: "100px" , width : "500px"}} data={data2}
    >
      <ArgumentAxis>
        </ArgumentAxis>
      <ValueAxis>
      scale name="discrete"
        discreteTicks
        discreteTickCount={5}
        discreteTickStep={10}
        </ValueAxis>
      <BarSeries valueField="value" argumentField="argument" />
    </Chart>
    </Grid>
    </Grid>

    </div>
  );
};

export default UsersList;
