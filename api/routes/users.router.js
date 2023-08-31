const express = require('express');
const passport = require('passport');
const router = express.Router();
const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
//const { checkRoles } = require('../middlewares/auth.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  updatePasswordSchema,
} = require('../schemas/users.schema');

const service = new UsersService();

router.get(
  '/:username',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  findUser,
);

router.post('/', validatorHandler(createUserSchema, 'body'), createUser);
router.patch(
  '/:username',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser,
);
router.patch(
  '/update-password/:username',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updatePasswordSchema, 'body'),
  updatePassword,
);
router.put(
  '/:username',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser,
);
router.delete(
  '/:username',
  validatorHandler(getUserSchema, 'params'),
  deleteUser,
);

// ************************************************************************************
// ************************************************************************************

async function findUser(req, res, next) {
  try {
    const { username } = req.params;
    const user = await service.find(username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { username } = req.params;
    const body = req.body;
    const user = await service.update(username, body);
    res.status(202).json({ message: 'User updated successfully', user });
  } catch (error) {
    next(error);
  }
}

async function updatePassword(req, res, next) {
  try {
    const { username } = req.params;
    const body = req.body;
    const user = await service.updatePassword(username, body);
    res.status(202).json({ message: 'Password changed successfully', user });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { username } = req.params;
    await service.delete(username);
    res.status(202).json({ message: 'User deleted successfully', username });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
