module.exports = function (sequelize, DataTypes) {
  var Channel = sequelize.define("Channel", {
    // The email cannot be null, and must be a proper email before creation
    channel_name: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Channel;
};
