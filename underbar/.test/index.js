global.expect = require('../lib/chai').expect;
global.sinon = require('sinon');

describe('Bare Minimum Requirements', function () {
  require('../lib/testSupport.js');
  require('../src/01_part1.js');
  require('../src/02_part2.js');
  // require('../src/03_advanced.js');
  require('../spec/01_part1.test.js');
  require('../spec/02_part2.test.js');
  // require('../spec/03_advanced.test.js');
});
