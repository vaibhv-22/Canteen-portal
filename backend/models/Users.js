const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    user_type: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    shop_name: {
        type: String,
        required: false
    },
    canteen_open_time: {
        type: String,
        required: false
    },
    canteen_close_time: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    age: {
        type: String,
        required: false
    },
    batch: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    wallet: {
        type: String,
        required: false
    },
    item_name: {
        type: String,
        required: false
    },
    item_tag: {
        type: String,
        required: false
    },
    item_rating: {
        type: String,
        required: false
    },
    item_ct: {
        type: String,
        required: false
    },
    food_id: {
        type: String,
        required: false
    },
    item_addon: {
        type: String,
        required: false
    },
    item_addon1: {
        type: String,
        required: false
    },
    item_addon2: {
        type: String,
        required: false
    },
    item_image: {
        type: String,
        required: false
    },
    item_price: {
        type: String,
        required: false
    },
    item_veg: {
        type: String,
        required: false
    },
    item_quantity: {
        type: String,
        required: false
    },
    item_status: {
        type: String,
        required: false
    },
    item_totalprice: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    curcount: {
        type: String,
        required: false
    },
    buyer_mail: {
        type: String,
        required: false
    },
    buyer_name: {
        type: String,
        required: false
    }
});

module.exports = User = mongoose.model("Users", UserSchema);