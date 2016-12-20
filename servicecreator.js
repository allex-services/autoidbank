function createAutoIDBankService(execlib, ParentService, leveldblib, bufferlib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    Path = require('path');

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function AutoIDBankService(prophash) {
    ParentService.call(this, prophash);
    this.usersdb = null;
  }
  
  ParentService.inherit(AutoIDBankService, factoryCreator);
  
  AutoIDBankService.prototype.__cleanUp = function() {
    if (this.usersdb) {
      this.usersdb.destroy();
    }
    this.usersdb = null;
    ParentService.prototype.__cleanUp.call(this);
  };

  AutoIDBankService.prototype.onDBsReady = function () {
    var d = q.defer();
    d.promise.then(this.readyToAcceptUsersDefer.resolve.bind(this.readyToAcceptUsersDefer, true));

    var config = lib.extend ({
      indexsize : 'big',
      startfromone : true
    }, this.getUserCreationConfig(bufferlib));

    if (!config.dbname) throw new Error('No dbname in AutoIDBankService config');

    this.usersdb = new leveldblib.DBArray({
      dbname: Path.join(this.dbdirpath, config.dbname),
      indexsize: config.indexsize,
      starteddefer: d,
      startfromone: config.startfromone,
      dbcreationoptions : config.dbcreationoptions
    });
  };

  
  return AutoIDBankService;
}

module.exports = createAutoIDBankService;
