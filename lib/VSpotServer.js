/**
 * @class VSpotServer
 */
'use strict'

const {EventEmitter} = require('events')
const debug = require('debug')('v:spot')
const m = require('./mixins')

const VSpotServerBase = [
  m.clientMix
].reduce(
  (Class, mix) => mix(Class),
  EventEmitter
)

/** @lends VSpotServer */
class VSpotServer extends VSpotServerBase {
  constructor () {
    super()
  }

  async listen () {
    const s = this
    s.intreval = setInterval(() => {

    }, 100)
  }

  async close () {
    const s = this
    clearInterval(s.intreval)
  }

  asConnector (clientId, client) {
    const s = this
    s.emit('client:connect', clientId)
    debug('connect', client)
    s.$$setClient(clientId, client)
    return {
      async call ({method, params, id, w}) {
        s.emit('client:call', w)
        debug('call', w)
        const {subject} = w
        const actor = s.$$findClientWithSubject(subject)
        if (!actor) {
          throw new Error(`Subject not found: ${JSON.stringify(subject)}`)
        }
        return await actor.execute({method, params, id, w})
          .then((result) => ({result}))
          .catch((error) => ({error}))
      },
      disconnect () {
        s.emit('client:disconnect', clientId)
        debug('disconnect', clientId)
        s.$$delClient(clientId)
      }
    }
  }
}

module.exports = VSpotServer
