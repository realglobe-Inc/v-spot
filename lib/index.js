/**
 * Spot for v
 * @module v-spot
 */
'use strict'

const VSpot = require('./VSpot')
const VSpotServer = require('./VSpotServer')
const VSpotClient = require('./VSpotClient')
const create = require('./create')

const lib = create.bind(this)

Object.assign(lib, create, {
  VSpot,
  VSpotServer,
  VSpotClient,
  create
})

module.exports = lib
