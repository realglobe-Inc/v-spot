/**
 * Test for VSpot.
 * Runs with mocha.
 */
'use strict'

const VSpot = require('../lib/VSpot')
const {ok, equal} = require('assert')

describe('v-spot', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const server = new VSpot.Server()
    const client01 = new VSpot.Client()
    const client02 = new VSpot.Client()

    await client01.connect(server)
    await client02.connect(server)

    await client01.disconnect()
    await client02.disconnect()

    await server.listen()
    await server.close()
  })
})

/* global describe, before, after, it */
