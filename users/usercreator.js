function createUser(execlib, ParentUser) {
  'use strict';
  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function User(prophash) {
    ParentUser.call(this, prophash);
  }
  
  ParentUser.inherit(User, require('../methoddescriptors/user'), [/*visible state fields here*/]/*or a ctor for StateStream filter*/);
  User.prototype.__cleanUp = function () {
    ParentUser.prototype.__cleanUp.call(this);
  };

  User.prototype.registerNew = function (defer) {
    this.__service.usersdb.push([Date.now()]).then(
      function (res) {
        defer.resolve(res[0]);
        defer = null;
      },
      defer.reject.bind(defer)
    )
  };

  return User;
}

module.exports = createUser;
