const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connecting to MongoDb Atlas Cloud
const uri = "mongodb+srv://bookuser1:book123@cluster0.yb2jpwb.mongodb.net/BookDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true   }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)});
})

// import routes
const router = require('./routes/routes');

// adding /books to before all routes
//run this in thunder client http://localhost:5000/book
app.use('/book', router);