const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(`${process.env.DB_URL}steamLink`,{
        useNewUrlParser: true,
        useUnifiedTopoLogy: true,
    }).then((data)=>{
        console.log(`mongo db connected with server ${data.connection.host}`);
    })
}


module.exports = connectDatabase