v-spot
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/v-spot
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/v-spot
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/v-spot.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/v-spot
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/v-spot.svg?token=
[bd_license_url]: https://github.com/realglobe-Inc/v-spot/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/v-spot
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/v-spot.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/v-spot.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/v-spot
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/v-spot.svg
[bd_npm_url]: http://www.npmjs.org/package/v-spot
[bd_npm_shield_url]: http://img.shields.io/npm/v/v-spot.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Spot for v

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install v-spot --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const vSpot = require('v-spot')

async function tryExample () {
  const Spot = vSpot()

  const NewYork = vSpot.clinet()
  const Japan = vSpot.clinet()

  await Spot.listen()
  await NewYork.connect(Spot)
  await Japan.connect(Spot)

  {
    class Person {
      async hi (msg) {
        return `hi, ${msg}`
      }
    }

    // Create a instance to a spot
    const john = NewYork.load(Person, 'jp.realglobe.new-york.john')
    await john.hi('I am in NewYork!')
  }

  {
    // Use remote instance
    const john = await Japan.use('jp.realglobe.new-york.john')
    await john.hi('Calling from Japan!')
  }
}

tryExample().catch((err) => console.error(err))

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/10.API Guide.md.hbs" Start -->

<a name="section-doc-guides-10-a-p-i-guide-md"></a>

API Guide
-----

+ [v-spot@1.0.2](./doc/api/api.md)
  + [create(args)](./doc/api/api.md#v-spot-function-create)
  + [VSpot](./doc/api/api.md#v-spot-class)


<!-- Section from "doc/guides/10.API Guide.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/realglobe-Inc/v-spot/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [THE Labo][t_h_e_labo_url]

[t_h_e_labo_url]: https://github.com/the-labo

<!-- Links End -->
