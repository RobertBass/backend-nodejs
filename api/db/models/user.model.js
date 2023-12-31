const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { CUSTOMER_TABLE } = require('./customer.model');

const USER_TABLE = 'users';

const userSchema = {
  username: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    },
  },
  validatorToken: {
    field: 'validator_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'inactive',
  },
  customerId: {
    field: 'customer_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  modifiedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'modified_at',
  },
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      /*hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        }
      }*/
    };
  }
}

module.exports = { USER_TABLE, userSchema, User };
