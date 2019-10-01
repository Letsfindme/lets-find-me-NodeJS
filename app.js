const Joi = require("joi");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid/v4");

const userRoute = require("./routes/user");
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const sequelize = require("./util/database");
const port = process.env.PORT || 8080;

const Address = require("./models/address");
const Post = require("./models/post");
const PostContent = require("./models/postContent");
const PostComment = require("./models/postComment");
const PostRate = require("./models/postRate");
const Image = require("./models/image");
const Avatar = require("./models/avatar");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const topfeed = require("./routes/topfeed");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + uuidv4());
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

////////////////////////////////////////     Router     ////////////////////////////////////
//Enables Parse json on the body of request
app.use(bodyParser.json());
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 1000 * 1000 * 2
    }
  }).array("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoute);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
});
app.use((req, res, next) => {
  res.status(404).send("<h1>not found</h1>");
});

/////////////////////////////////////    Relation /////////////////////////////////////
// Man.hasOne(RightArm);
// RightArm.belongsTo(Man);

Address.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasOne(Address);
//User.hasMany(Avatar);
User.hasOne(Avatar);
//User.hasOne(Avatar);
Avatar.belongsTo(User);
Post.belongsTo(User, {
  onDelete: "CASCADE"
});
//User.hasMany(Post); //One-to-many

PostRate.belongsTo(Post, {
  constraints: true,
  onDelete: "CASCADE"
});
Post.hasMany(PostRate);
PostRate.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});

Post.hasMany(PostComment);
PostComment.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});
Post.hasMany(Image);
//PostContent.hasMany(Image)
Image.belongsTo(Post);

Cart.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});
User.hasOne(Cart);
Cart.belongsToMany(Product, {
  through: CartItem
});
Product.belongsToMany(Cart, {
  through: CartItem
});
Order.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem
});

sequelize
  // .sync({
  //     force: true
  // })
  .sync()
  // .then(result => {
  //     return User.findAll();
  //     // console.log(result);
  // })
  // .then(user => {
  //     console.log(user[0]);

  //     if (!user[0]) {
  //         return User.create({
  //             firstname: 'Max',
  //             email: 'test@test.com'
  //         });
  //     }
  //     return user;
  // })
  .then(cart => {
    app.listen(port, console.log(`Listening on port ${port}`));
  })
  .catch(err => {
    console.log(err);
  });
