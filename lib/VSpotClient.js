/**
 * @class VSpotClient
 */
'use strict'

const {
  newId
} = require('./helpers')

const {EventEmitter} = require('events')

/** @lends VSpotClient */
class VSpotClient extends EventEmitter {
  constructor () {
    super()
    const s = this
    s.id = newId()
    s.loaded = {}
    s.connector = null
  }

  /**
   * Load subject into the spot
   * @param Class
   * @param {string} subject
   * @returns {object} - Loaded instance
   */
  load (Class, subject) {
    const s = this
    if (s.connector) {
      throw new Error('[VSpotClient] Can not load a class after connecting')
    }
    const instance = typeof Class === 'function' ? new Class() : Class
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
    if (!s.connector) {
      throw new Error('[VSpotClient] Can not use subject before connecting')
    }
    const instance = s.loaded[subject]
    if (instance) {
      return instance
    }
    const proxy = new Proxy({}, {
      get (target, name) {
        if (target.hasOwnProperty(name)) {
          return target[name]
        }
        const isReserved = ['then', 'catch', 'constructor', 'valueOf', 'inspect', 'toString'].includes(name)
        if (isReserved) {
          return target[name]
        }
        const verb = String(name)

        async function methodProxy (...params) {
          const res = await s.call({
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

        return methodProxy
      }
    })
    return proxy
  }

  /**
   * Connect to connector
   * @param connector
   * @returns {Promise.<void>}
   */
  async connect (connector) {
    const s = this
    if (connector.asConnector) {
      connector = connector.asConnector(s.id, s.asConnector())
    }

    s.connector = connector
  }

  /**
   * Disconnect from connector
   * @returns {Promise.<void>}
   */
  async disconnect () {
    const s = this
    const {connector} = s
    if (!s.connector) {
      return
    }
    connector.disconnect()
    s.connector = null
  }

  /**
   * Call a method remotely
   * @param {string} method
   * @param {Array} params
   * @param {string} id
   * @param {Object} w
   * @returns {Promise.<*>}
   */
  async call ({method, params, id, w}) {
    const s = this
    return s.connector.call({
      method,
      params,
      id,
      w
    })
  }

  /**
   * Execute a method locally
   * @param {Object} w
   * @returns {Promise.<*>}
   */
  async execute ({w}) {
    const s = this
    const instance = s.loaded[w.subject]
    return instance[w.verb](...w.object)
  }

  asConnector () {
    const s = this
    return {
      id: s.id,
      execute: s.execute.bind(s),
      subjects: Object.keys(s.loaded)
    }
  }

}

module.exports = VSpotClient
