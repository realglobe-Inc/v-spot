/**
 * @class VSpotClient
 */
'use strict'

const {
  allMethodNames,
  newId
} = require('./helpers')

const {EventEmitter} = require('events')

/** @lends VSpotClient */
class VSpotClient extends EventEmitter {
  constructor () {
    super()
    const s = this
    s.loaded = {}
    s.connected = false
  }

  /**
   * Load subject into the spot
   * @param Class
   * @param {string} subject
   * @returns {object} - Loaded instance
   */
  load (Class, subject) {
    const s = this
    if (s.connected) {
      throw new Error('[VSpotClient] Can not load a class after connecting')
    }
    const instance = new Class()
    s.loaded[subject] = instance
    return instance
  }

  /**
   * Use subject
   * @param {string} subject
   * @returns {Promise.<Object>} - Local loaded subject or remote subject proxy
   */
  async use (subject) {
    const s = this
    if (!s.connected) {
      throw new Error('[VSpotClient] Can not load a class before connecting')
    }
    const instance = s.loaded[subject]
    if (instance) {
      return instance
    }
    const proxy = new Proxy({}, {
      get (target, verb) {
        async function methodProxy (...params) {
          const res = await s.send({
            method: [subject, verb].join('.'),
            params,
            id: newId(),
            w: {
              subject,
              verb,
              object: params
            }
          })
          if (!res) {
            throw new Error(`Unknown verb: ${verb}`)
          }
          const {result, error} = res
          if (error) {
            throw error
          }
          return result
        }
      }
    })
    return proxy
  }

  /**
   * Connect to server
   * @param server
   * @returns {Promise.<void>}
   */
  async connect (server) {
    const s = this
    server.$$setClient(s.id, s)
    s.server = server
    s.connected = true
  }

  /**
   * Disconnect from server
   * @returns {Promise.<void>}
   */
  async disconnect () {
    const s = this
    const {server} = s
    if (!s.server) {
      return
    }
    server.$$delClient(s.id)
    s.server.emit('leave')
    s.server = null
    s.connected = false
  }

  async send ({method, params, id, w}) {
    const s = this
    s.server.call({
      method,
      params,
      id,
      w
    })
  }

  async execute ({method, params, id, w}) {
    const s = this
    const instance = s.loaded[w.subject]
    return instance[method](...params)
  }

}

module.exports = VSpotClient
