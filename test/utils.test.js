const utils = require('../lib/utils');


describe('utls.itMatchsOne()', () => {
  test('should fail with non string search term', () => {
    expect(() => {
      utils.itMatchsOne(['1', '2'], 2);
    }).toThrow();
  });

  test('search term should match one of the array entries', () => {
    const result = utils.itMatchsOne(['lorem', 'ipsum'], 'ipsum');
    expect(result).toBe(true);
  });

  test('search term should NOT match one of the array entries', () => {
    const result = utils.itMatchsOne(['lorem', 'ipsum'], 'dolor');
    expect(result).toBe(false);
  });
});
