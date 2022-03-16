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
router.post("/register", (req, res) => {
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
        curcount: "0",
        wallet: "0",
        item_name: req.body.item_name,
        item_image: req.body.item_image,
        item_price: req.body.item_price,
        item_veg: req.body.item_veg,
        item_tag: req.body.item_tag,
        item_rating: req.body.item_rating,
        item_ct: req.body.item_ct,
        item_addon: req.body.item_addon,
        item_addon1: req.body.item_addon1,
        item_addon2: req.body.item_addon2,
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
router.post("/updaterating", (req, res) => {
    console.log(req.body);
    User.findOne({ _id: req.body.food_id }).then(user => {
        // Check if user email exists
        console.log(user);
        user.item_ct = +user.item_ct + 1;
        user.item_rating = +user.item_rating + +req.body.item_rating;
        console.log(user);
        User.findOneAndUpdate({ _id: req.body.food_id }, user, { new: true }, function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        });
    });
    // FINDONE and update
    // console.log(req.body);
    // User.findOneAndUpdate({ _id: req.body.food_id }, {$inc:{item_rating:req.body.item_rating}}, { new: true },
    //     function(err, doc) {
    //         if (err)
    //             return res.send(500, { error: err });
    //         return res.status(200).json(doc);
    //     }
    // );
});

router.post("/ratingdone", (req, res) => {
    // FINDONE and update
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body._id }, { item_rating: "1" }, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});

router.post("/addmoney", (req, res) => {
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

router.post("/addfood", (req, res) => {
    console.log(req.body);
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
        item_tag: req.body.item_tag.join(","),
        item_rating: req.body.item_rating,
        item_ct: req.body.item_ct,
        item_addon: req.body.item_addon,
        item_addon1: req.body.item_addon1,
        item_addon2: req.body.item_addon2,
        date: req.body.date
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    // window.location = "/food_dash";
});
router.post("/delfood", (req, res) => {
    // console.log(req.body);
    User.findOneAndRemove(req.body, function(err, obj) {
        if (err) throw err;
        console.log(res);
    });
    // window.location.reload();
});
router.post("/updatefoodordertoaccept", (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body.id }, { item_status: "Accepted" }, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});
router.post("/updatefoodordertocooking", (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body.id }, { item_status: "Cooking" }, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});
router.post("/updatefoodordertoready", (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body.id }, { item_status: "Ready for Pickup" }, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});
router.post("/updatefoodordertocomplete", (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body.id }, { item_status: "Completed" }, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});
router.post("/updatefoodordertoreject", (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body.id }, { item_status: "Rejected" }, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});
router.post("/returnmoney", (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.buyer_mail }).then(user => {
        // Check if user email exists
        console.log(user);
        user.wallet = +user.wallet + +req.body.amount;
        console.log(user);
        User.findOneAndUpdate({ email: req.body.buyer_mail }, user, { new: true }, function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        });
    });
    
});
router.post("/updatewalletlocal", (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
    .then(user => {
        return res.status(200).json(user);
    });
    
});


router.post("/editfood", (req, res) => {
    // FINDONE and update
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body._id },
        req.body, { new: true },
        function(err, doc) {
            if (err)
                return res.send(500, { error: err });
            return res.status(200).json(doc);
        }
    );
});

router.post("/orderfood", (req, res) => {
    // pass order 
    console.log(req.body);
    console.log(req.body.name);
    const newUser = new User({
        batch: req.body.batch,
        age: req.body.age,
        shop_name: req.body.shop_name,
        item_name: req.body.item_name,
        item_image: req.body.item_image,
        item_price: req.body.item_price,
        item_veg: req.body.item_veg,
        item_tag: req.body.item_tag,
        item_rating: req.body.item_rating,
        item_ct: req.body.item_ct,
        item_addon: req.body.item_addon,
        item_addon1: req.body.item_addon1,
        item_addon2: req.body.item_addon2,
        buyer_mail: req.body.buyer_mail,
        buyer_name: req.body.buyer_name,
        item_quantity: req.body.item_quantity,
        item_status: req.body.item_status,
        food_id: req.body.food_id,
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

router.post("/updatecountfororder", (req, res) => {
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
router.post("/updatewallet", (req, res) => {
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
module.exports = router;