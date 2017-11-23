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
    const client03 = new VSpot.Client()

    try {
      {
        class Person {
          async hi (msg) {
            return `hi, ${msg}`
          }
        }

        // Create a instance to a spot
        const john = client01.load(Person, 'jp.realglobe.new-york.john')
        await john.hi('I am in NewYork!')
      }

      await server.listen()

      await client01.connect(server)
      await client02.connect(server)

      {
        // Use remote instance
        const john = await client02.use('jp.realglobe.new-york.john')
        equal(
          await john.hi('Calling from Japan!'),
          'hi, Calling from Japan!'
        )
      }
    } finally {

      await client02.disconnect()

      {
        await client03.connect(server)
        {
          // Use remote instance
          const john = await client03.use('jp.realglobe.new-york.john')
          equal(
            await john.hi('Calling from Japan!'),
            'hi, Calling from Japan!'
          )
        }
        await client03.disconnect()
      }

      await client01.disconnect()

      await server.close()
    }
  })
})

/* global describe, before, after, it */
