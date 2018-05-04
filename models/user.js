// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    //The username takes a unique notnull string with only letters and without spaces 
    //along with being 4-15 characters in length
    username: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
      validate: {
        is: /^[a-z]+$/i,
        len: [4, 15],   
      }
    },
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null and be within 6-15 characters in length
    password: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [6, 15]
      }
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
