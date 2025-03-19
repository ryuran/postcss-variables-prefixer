const utils = require('../lib/utils');

describe('utils.itMatchesOne()', () => {
  test('should fail with non string search term', () => {
    expect(() => {
      utils.itMatchesOne(['1', '2'], 2);
    }).toThrow();
  });

  test('search term should match one of the array entries', () => {
    const result = utils.itMatchesOne(['lorem', 'ipsum'], 'ipsum');
    expect(result).toBe(true);
  });

  test('search term should NOT match one of the array entries', () => {
    const result = utils.itMatchesOne(['lorem', 'ipsum'], 'dolor');
    expect(result).toBe(false);
  });
});
