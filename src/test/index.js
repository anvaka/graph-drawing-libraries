var test = require('tape').test,
    librariesData = require('../src/scripts/data/libraries');

test('It has libraries data', function (t) {
  t.ok(librariesData && librariesData.libraries, 'It has libraries info');
  t.end();
});
