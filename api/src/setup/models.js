// Imports
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from './database'

const models = {
  User: databaseConnection.import('../models/user'),
  Address: databaseConnection.import('../models/address'),
  Avatar: databaseConnection.import('../models/avatar'),
  CartItem: databaseConnection.import('../models/cart-item'),
  Cart: databaseConnection.import('../models/cart'),
  Image: databaseConnection.import('../models/image'),
  OrderItem: databaseConnection.import('../models/order-item'),
  Order: databaseConnection.import('../models/order'),
  Post: databaseConnection.import('../models/post'),
  PostContent: databaseConnection.import('../models/postContent'),
  PostComment: databaseConnection.import('../models/postComment'),
  PostRate: databaseConnection.import('../models/postRate'),
  Product: databaseConnection.import('../models/product')
}

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models
