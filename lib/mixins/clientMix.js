/**
 * Client mix
 * @function clientMix
 * @param {function} Class - Class to mix
 * @return {function} - Mixed class
 */
'use strict'

/** @lends clientMix */
function clientMix (Class) {
  class ClientMixed extends Class {
    constructor () {
      super(...arguments)
      const s = this
      s.$$clients = {}
    }

    $$setClient (id, client) {
      const s = this
      s.$$clients[id] = client
    }

    $$getClient (id) {
      const s = this
      return s.$$clients[id]
    }

    $$delClient () {
      const s = this
      delete s.$$clients
    }

    $$findClientWithSubject (subject) {
      const s = this
      return Object.values(s.$$clients).find(({subjects}) => subjects.includes(subject))
    }

  }

  return ClientMixed
}

module.exports = clientMix
