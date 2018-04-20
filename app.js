const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const check_auth = require('./api/middleware/check_auth');
const userRoutes = require('./api/routes/users');
const bookRoutes = require("./api/routes/books");
const issuedRoutes = require("./api/routes/issued_book");
const authRoutes = require("./api/routes/auth");
const options = {
  reconnectInterval: 2000
}
// mongoose.connect('mongodb://kpmadan:madan123@ds113746.mlab.com:13746/node-rest-shop', options, function(error) {
//   console.log(error);
// });
mongoose.connect('mongodb://localhost:27017/Library');
app.use(morgan("dev"));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.json({limit:'50mb'}));
// app.use(bodyParser.urlencoded({extended:false, limit:'50mb'}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/auth', authRoutes);

app.use(check_auth);

app.use("/books", bookRoutes);
app.use("/user", userRoutes);
app.use("/issue", issuedRoutes);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT);
