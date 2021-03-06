'use es6';

import {expect} from 'chai';

import {List, Map} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';
import Duration from '../src/data/Duration';
import Location from '../src/data/Location';
import PriceEstimate from '../src/data/PriceEstimate';
import PriceEstimates from '../src/data/PriceEstimates';
import PriceEstimatesTableBuilder from '../src/services/tables/builders/PriceEstimatesTableBuilder';
import PriceRange from '../src/data/PriceRange';
import TimeUnit from '../src/data/TimeUnit';

describe('Test Price Estimates Table Builder', function() {
  let start = new Location({
    name: 'start location name',
    coordinate: new Coordinate()
  });
  let end = new Location({
    name: 'end location name',
    coordinate: new Coordinate()
  });
  let estimates = List.of(
    new PriceEstimate({
      productName: 'jae',
      distance: new Distance({
        value: 1,
        unit: DistanceUnit.MILE
      }),
      range: new PriceRange({
        low: 2,
        high: 3,
        currencyCode: 'USD'
      }),
      duration: new Duration({
        length: 4,
        unit: TimeUnit.SECOND
      }),
      surgeMultiplier: 1
    }),
    new PriceEstimate({
      productName: 'bradley',
      distance: new Distance({
        value: 5,
        unit: DistanceUnit.MILE
      }),
      range: new PriceRange({
        low: 6,
        high: 7,
        currencyCode: 'GBP'
      }),
      duration: new Duration({
        length: 8,
        unit: TimeUnit.SECOND
      }),
      surgeMultiplier: 1.1
    }),
    new PriceEstimate({
      productName: 'baebae',
      distance: new Distance({
        value: 9,
        unit: DistanceUnit.MILE
      }),
      range: new PriceRange({
        low: 10,
        high: 11,
        currencyCode: 'EUR'
      }),
      duration: new Duration({
        length: 12,
        unit: TimeUnit.SECOND
      }),
      surgeMultiplier: 13
    }),
  );
  let priceEstimates = new PriceEstimates({
    start: start,
    end: end,
    estimates: estimates
  });

  it('tests table creation', function() {
    let expectedTableString = '\u001b[90m┌─────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬──────────┐\u001b[39m\n\u001b[90m│\u001b[39m    🚘    \u001b[90m│\u001b[39m    💸    \u001b[90m│\u001b[39m   🔃   \u001b[90m│\u001b[39m    ⏳    \u001b[90m│\u001b[39m 💥 Surge💥 \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae     \u001b[90m│\u001b[39m $2-$3   \u001b[90m│\u001b[39m 1 mi. \u001b[90m│\u001b[39m 4 sec.  \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m bradley \u001b[90m│\u001b[39m £6-£7   \u001b[90m│\u001b[39m 5 mi. \u001b[90m│\u001b[39m 8 sec.  \u001b[90m│\u001b[39m 1.1x 😬   \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m baebae  \u001b[90m│\u001b[39m €10-€11 \u001b[90m│\u001b[39m 9 mi. \u001b[90m│\u001b[39m 12 sec. \u001b[90m│\u001b[39m 13x 😬    \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼─────────┴───────┴─────────┴──────────┤\u001b[39m\n\u001b[90m│\u001b[39m    📍    \u001b[90m│\u001b[39m start location name                  \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼──────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m    🔚    \u001b[90m│\u001b[39m end location name                    \u001b[90m│\u001b[39m\n\u001b[90m└─────────\u001b[39m\u001b[90m┴──────────────────────────────────────┘\u001b[39m';
    let tableString = PriceEstimatesTableBuilder.build(priceEstimates);
    console.log(expectedTableString);
    console.log(tableString);
    expect(tableString).to.equal(expectedTableString);
  })
});
