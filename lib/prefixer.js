const postcss = require('postcss');
const { itMatchsOne } = require('./utils');

const variableRegex = /var\(\s*(--[^,\s]+?)(?:\s*,\s*(.+))?\s*\)/;
const variableRegexGlobal = /var\(\s*(--[^,\s]+?)(?:\s*,\s*(.+))?\s*\)/g;

const prefixer = (options) => (css) => {
  const { prefix, ignore } = {
    prefix: '',
    ignore: [],
    ...options,
  };

  if (typeof prefix !== 'string') {
    throw new Error('@postcss-variables-prefixer: prefix option should be of type string.');
  }

  if (!Array.isArray(ignore)) {
    throw new Error('@postcss-variables-prefixer: ignore options should be an Array.');
  }

  if (!prefix.length) {
    return;
  }

  css.walkDecls(/^--/, (decl) => {
    if (itMatchsOne(ignore, decl.prop)) {
      return;
    }

    const newDecl = decl.clone({
      prop: decl.prop.replace(/^--/, `--${prefix}`),
    });

    decl.replaceWith(newDecl);
  });

  css.replaceValues(variableRegexGlobal, { fast: 'var(' }, (string) => {
    if (itMatchsOne(ignore, variableRegex.exec(string)[1])) {
      return string;
    }

    return string.replace(/^var\(\s*--/, `var(--${prefix}`);
  });
};

module.exports = postcss.plugin('postcss-variables-prefixer', prefixer);
