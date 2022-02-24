'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, 
        { foreignKey: 'profileId' })
    }

    get honorific(){
      let result
      if (this.gender === `male`){
        result = `Mr. ${this.name}`
      } else if (this.gender === `female`){
        result = `Mrs. ${this.name}`
      } else {
        result = `${this.name}`
      }
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    birthdayDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};