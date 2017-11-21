'use strict'

const uuid = require('uuid')

module.exports = {
  newId () {
    return uuid.v4()
  }
}
