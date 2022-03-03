"use strict";
const { Model } = require("sequelize");
var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: "userId" });
      User.belongsTo(models.Profile, { foreignKey: "profileId" });
    }
    get formatName(){
      if(this.role === `admin`){
        return `Hello Admin ${this.userName}`
      } else {
        return `Hello User ${this.userName}`
      }
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        // allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: `Name is REQUIRED`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: true,
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: `Name is REQUIRED`,
          },
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Name is REQUIRED`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `role is REQUIRED`,
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash
        },
        beforeSave(instance, options){
          instance.profileId = instance.id
        }
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};