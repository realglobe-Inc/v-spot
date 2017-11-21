/**
 * Spot for v
 * @module v-spot
 */
'use strict'

const VSpot = require('./VSpot')
const create = require('./create')

const lib = create.bind(this)

Object.assign(lib, {
  VSpot,
  create
})

module.exports = lib
