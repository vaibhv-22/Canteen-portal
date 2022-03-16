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

var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/addfood", (req, res) => {
    console.log(req.body.name);
    const newUser = new User({
        user_type: req.body.user_type,
        name: req.body.name,
        shop_name: req.body.shop_name,
        canteen_open_time: req.body.canteen_open_time,
        canteen_close_time: req.body.canteen_close_time,
        phone_number: req.body.phone_number,
        password: req.body.password,
        age: req.body.age,
        batch: req.body.batch,
        email: req.body.email,
        item_name: req.body.item_name,
        item_image: req.body.item_image,
        item_price: req.body.item_price,
        item_veg: req.body.item_veg,
        item_tag: req.body.item_tag,
        item_rating: req.body.item_rating,
        item_ct: req.body.item_ct,
        item_addon: req.body.item_addon,
        date: req.body.date
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        console.log(user);
        if (!user) {
            console.log("Email not found!");
            // user email do not exist
            res.status(200).json({ alertt: "Email not found!" });
        } else {
            const passwd = req.body.password;
            if (passwd == user.password) {
                console.log("Password matched!");
                // save data to local storage
                res.status(200).json(user);
            } else {
                console.log("Password not matched!");
                // user email exist but password is incorrect
                res.status(200).json({ alertt: "Password is incorrect" });
            }
        }
    });
});

router.post("/profedit", (req, res) => {
    // FINDONE and update
    console.log(req.body);
    User.findOneAndUpdate({ email: req.body.email },
        req.body, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});
router.post("/profedit", (req, res) => {
    // FINDONE and update
    console.log(req.body);
    User.findOneAndUpdate({ email: req.body.email },
        req.body, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});
router.post("/delfood", (req, res) => {
    User.findOneAndRemove(req.body, function(err, obj) {
        if (err) throw err;
        console.log(res);
    });
    // window.location.reload();
});


module.exports = router;