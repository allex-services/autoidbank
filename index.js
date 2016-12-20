function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['allex:bank', 'allex:leveldb:lib', 'allex:buffer:lib']
    },
    sinkmap: {
      dependencies: ['allex:bank']
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;
