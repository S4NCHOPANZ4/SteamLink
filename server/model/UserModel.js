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
    id: String,
    name: String,
    rarity: String, 
    image: String,
    value: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


orderSchema.methods.removeFromBalance = function(amount) {
  if (this.balance >= amount) {
    this.balance = parseFloat((this.balance - amount).toFixed(2));
    return this.save();
  } else {
    console.log("invalid balance");
    return this;
  }
};

orderSchema.methods.addToBalance = function(amount) {
    this.balance = parseFloat((this.balance + amount).toFixed(2));
    return this.save();
};

orderSchema.methods.addToInventory = function(newItem) {
  this.Inventory.push(newItem);
  return this.save();
};

// Método para eliminar un objeto específico del array Inventory
orderSchema.methods.removeFromInventory = function(itemId) {
  const item = this.Inventory.find(item => item._id.toString() === itemId.toString());
  if (item) {
    this.balance = parseFloat((this.balance + item.value).toFixed(2));
    const itemIndex = this.Inventory.findIndex(item => item._id.toString() === itemId.toString());
    if (itemIndex !== -1) {
      this.Inventory.splice(itemIndex, 1);
    }
    return this.save();
  } else {
    console.log("Item not found");
    return this;
  }
};



module.exports = mongoose.model("User", orderSchema);
