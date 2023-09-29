const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  steamid: String,
  username: String,
  avatar: String,
  avatarmedium: String,
  avatarfull: String,
  balance: Number,
  Inventory: [
    { 
    inventoryId: String,
    id: String,
    name: String,
    rarity: String, 
    image: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", orderSchema);
