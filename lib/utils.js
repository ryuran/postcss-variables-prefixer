module.exports = {
  itMatchsOne(arr, term) {
    return arr.some((i) => term.search(i) >= 0);
  },
};
