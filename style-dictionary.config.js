import StyleDictionary from 'style-dictionary';

function normalizePath(path) {
  const THEME_KEYS = ['light', 'dark', 'global'];
  if (THEME_KEYS.includes(path[0])) {
    return path.slice(1);
  }
  return path;
}

StyleDictionary.registerTransform({
  name: 'name/no-theme',
  type: 'name',
  matcher: () => true,
  transform: t => t.path.slice(1).join('-'),
});

StyleDictionary.registerTransform({
  name: 'name/full-path',
  type: 'name',
  matcher: () => true,
  transform: t => t.path.join('-'),
});

StyleDictionary.registerFormat({
  name: 'ts/object',
  format: ({ dictionary }) => {
    const result = {};
    for (const token of dictionary.allTokens) {
      const path = normalizePath(token.path);
      let ref = result;
      for (let i = 0; i < path.length - 1; i++) {
        ref[path[i]] = ref[path[i]] || {};
        ref = ref[path[i]];
      }
      ref[path[path.length - 1]] = 'string';
    }
    return `export const tokens = ${JSON.stringify(result, null, 2)} as const;`;
  },
});

StyleDictionary.registerFormat({
  name: 'ts/values',
  format: ({ dictionary }) => {
    const result = {};

    for (const token of dictionary.allTokens) {
      const path = normalizePath(token.path);

      let ref = result;
      for (let i = 0; i < path.length - 1; i++) {
        ref[path[i]] = ref[path[i]] || {};
        ref = ref[path[i]];
      }

      const cssVarName = `--${path.join('-')}`;
      ref[path[path.length - 1]] = cssVarName;
    }

    return `export const tokens = ${JSON.stringify(result, null, 2)} as const;`;
  },
});

export default {
  source: ['src/tokens/**/*.json'],
  platforms: {
    cssLight: {
      transforms: [
        'attribute/cti',
        'name/no-theme',
        'color/css',
        'size/rem',
        'time/seconds',
      ],
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root' },
          filter: t => ['light', 'global'].includes(t.path[0]),
        },
      ],
    },
    cssDark: {
      transforms: [
        'attribute/cti',
        'name/no-theme',
        'color/css',
        'size/rem',
        'time/seconds',
      ],
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tokens.dark.css',
          format: 'css/variables',
          options: { selector: ':root[data-theme="dark"]' },
          filter: t => ['dark', 'global'].includes(t.path[0]),
        },
      ],
    },
    cssBase: {
      transforms: ['attribute/cti', 'name/full-path', 'color/css', 'size/rem'],
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tokens.base.css',
          format: 'css/variables',
          options: { selector: ':root' },
          filter: t =>
            [
              'spacing',
              'radius',
              'shadow',
              'border',
              'typography',
              'index',
              'color',
              'z-index',
              'blur',
            ].includes(t.path[0]),
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/map-deep',
          mapName: 'tokens',
        },
      ],
    },
    dts: {
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'ts/object',
        },
      ],
    },
    dtsValues: {
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tokens.values.ts',
          format: 'ts/values',
        },
      ],
    },
  },
};
