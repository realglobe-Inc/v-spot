/**
 * @class VSpotServer
 */
'use strict'

const {EventEmitter} = require('events')

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

  asConnector (clientId, connector) {
    const s = this
    s.$$setClient(clientId, connector)
    return {
      async call ({method, params, id, w}) {
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
        s.$$delClient(clientId)
      }
    }
  }
}

module.exports = VSpotServer
