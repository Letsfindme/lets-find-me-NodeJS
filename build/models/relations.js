"use strict";

var port = process.env.PORT || 8080;

var Address = require('./models/address');

var Post = require('./models/post');

var PostContent = require('./models/postContent');

var PostRate = require('./models/postRate');

var Image = require('./models/image');

var Avatar = require('./models/avatar');

var Product = require('./models/product');

var User = require('./models/user');

var Cart = require('./models/cart');

var CartItem = require('./models/cart-item');

var Order = require('./models/order');

var OrderItem = require('./models/order-item');

var sequelize = require('./util/database');

var topfeed = require('./routes/topfeed'); /////////////////////////////////////    Relation /////////////////////////////////////
// Man.hasOne(RightArm);
// RightArm.belongsTo(Man);
//Address.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });


User.hasMany(Address); //User.hasMany(Avatar);

User.hasOne(Avatar); //User.hasOne(Avatar);

Avatar.belongsTo(User);
Post.belongsTo(User, {
  onDelete: 'CASCADE'
}); //User.hasMany(Post); //One-to-many

PostRate.belongsTo(Post, {
  constraints: true,
  onDelete: 'CASCADE'
});
Post.hasMany(PostRate);
PostRate.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
Post.hasMany(Image); //PostContent.hasMany(Image)

Image.belongsTo(Post);
Cart.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
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
  onDelete: 'CASCADE'
});
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem
}); ////////////////////////////////     DB    /////////////////////////////////////

sequelize // .sync({
//     force: true
// })
.sync() // .then(result => {
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
.then(function (cart) {
  app.listen(port, console.log("Listening on port ".concat(port)));
})["catch"](function (err) {
  console.log(err);
});
//# sourceMappingURL=relations.js.map