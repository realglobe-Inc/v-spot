/**
 * Create a VSpot instance
 * @function create
 * @param {...*} args
 * @returns {VSpot}
 */
'use strict'

const VSpot = require('./VSpot')
const VSpotClient = require('./VSpotClient')
const VSpotServer = require('./VSpotServer')

/** @lends create */
function create (...args) {
  return new VSpot(...args)
}

Object.assign(create, {
  server (...args) {
    return new VSpotServer(...args)
  },
  client (...args) {
    return new VSpotClient(...args)
  }
})

module.exports = create
