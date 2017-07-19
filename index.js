function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['allex_bankservice', 'allex_leveldblib', 'allex_bufferlib']
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
