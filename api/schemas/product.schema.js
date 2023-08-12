const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const description = joi.string().min(5).max(100);
const price = joi.number().min(1);
const stock = joi.number().integer();
const categoryId =  joi.any().valid(1, 2, 3, 4, 5, 6); //'electronics', 'clothes', 'furnitures', 'shoes', 'toys', 'others'
const images = joi.array();

const createProductSchema = joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  categoryId: categoryId.required(),
  images: images
});

const updateProductSchema = joi.object({
  name: name,
  description: description,
  price: price,
  stock: stock,
  categoryId: categoryId,
  images: images
});

const getProductSchema = joi.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
