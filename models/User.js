module.exports = function(sequelize, datatypes) {
    var User = sequelize.define('User', {
        name:           datatypes.STRING,
    }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.User, { as: 'Friends'});
      }
    }
  });
  return User;
}
