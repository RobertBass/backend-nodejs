const express = require('express');

const CategoryService = require('../services/categrories.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get('/', getCategories);
router.get('/:id', validatorHandler(getCategorySchema, 'params'), getCategory);

// ************************************************************************************
//  *-- CATEGORY FUNCTIONS--*
// ************************************************************************************

async function getCategories(req, res, next) {
  try {
    const categories = await service.show();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

async function getCategory(req, res, next) {
  try {
    const { id } = req.params;
    const category = await service.find(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
