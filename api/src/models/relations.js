
const port = process.env.PORT || 8080;

const Address = require('./models/address');
const Post = require('./models/post');
const PostContent = require('./models/postContent');
const PostRate = require('./models/postRate');
const Image = require('./models/image');
const Avatar = require('./models/avatar');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const sequelize = require('./util/database');
const topfeed = require('./routes/topfeed');





/////////////////////////////////////    Relation /////////////////////////////////////
// Man.hasOne(RightArm);
// RightArm.belongsTo(Man);

//Address.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Address);
//User.hasMany(Avatar);
User.hasOne(Avatar);
//User.hasOne(Avatar);
Avatar.belongsTo(User);
Post.belongsTo(User, {
    onDelete: 'CASCADE'
});
//User.hasMany(Post); //One-to-many

PostRate.belongsTo(Post, {
    constraints: true,
    onDelete: 'CASCADE'
})
Post.hasMany(PostRate)
PostRate.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
})
Post.hasMany(Image)
//PostContent.hasMany(Image)
Image.belongsTo(Post)

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
});


////////////////////////////////     DB    /////////////////////////////////////
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