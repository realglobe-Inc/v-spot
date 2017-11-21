/**
 * @class VSpot
 */
'use strict'

const VSpotServer = require('./VSpotServer')
const VSpotClient = require('./VSpotClient')

/** @lends VSpot */
class VSpot extends VSpotServer {
}

VSpot.Server = VSpotServer
VSpot.Client = VSpotClient

module.exports = VSpot
