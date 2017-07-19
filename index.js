function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['allex_bankservice', 'allex:leveldb:lib', 'allex:buffer:lib']
    },
    sinkmap: {
      dependencies: ['allex_bankservice']
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;
