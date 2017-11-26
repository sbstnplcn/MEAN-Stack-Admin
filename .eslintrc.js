'use strict';

module.exports = {
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'script'
  },
  'plugins': ['angular'],
  'env': {
    'node': true,
    'es6': true
  },
	"globals": {
    "angular": 1,
		"confirm": 1
  },
  'rules': {
    'no-console': 'warn',

    'block-scoped-var': 'error',
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'no-caller': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-native-reassign': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-new': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'radix': 'error',
    'wrap-iife': ['error', 'inside'],

    'strict': 'error',

    'no-catch-shadow': 'error',
    'no-label-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-shadow': 'error',
    'no-undef-init': 'error',
    'no-unused-vars': ['error', {'vars': 'all', 'args': 'after-used', 'argsIgnorePattern': '^_'}],
    'no-use-before-define': ['error', 'nofunc'],

    'no-mixed-requires': ['error', true],
    'no-new-require': 'error',
    'no-path-concat': 'error',

    'array-bracket-spacing': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'camelcase': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'eol-last': 'error',
    'func-names': ["error", "never"],
    'func-style': ['error', 'declaration'],
		'indent': ['error', 'tab', { 'SwitchCase': 1, 'MemberExpression': 0}],
    'key-spacing': 'error',
    'keyword-spacing': ['error', {'after': true}],
    'linebreak-style': 'error',
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-lonely-if': 'error',
    'no-new-object': 'error',
    'no-spaced-func': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'object-curly-spacing': 'error',
    'one-var': ['error', {'initialized': 'never', 'uninitialized': 'always'}],
    'operator-assignment': 'error',
    'operator-linebreak': ['error', 'before'],
    'quote-props': ['error', 'as-needed', {'keywords': true, 'numbers': true}],
    'quotes': ['error', 'single', 'avoid-escape'],
    'semi-spacing': 'error',
    'semi': ["error", "never"],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {'anonymous': 'always', 'named': 'never'}],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'wrap-regex': 'error',

		// Es6 features
		'arrow-body-style': ['error', 'as-needed'],
		'arrow-parens': ['error', 'always'],
		'arrow-spacing': 'error',
		'constructor-super': 'error',
		'generator-star-spacing': ['error', {'before': false, 'after': true}],
		'no-confusing-arrow': 'error',
		'no-const-assign': 'error',
		'no-dupe-class-members': 'error',
		'no-duplicate-imports': 'error',
		'no-new-symbol': 'error',
		'no-this-before-super': 'error',
		// 'no-useless-computed-key': 'error',
		'no-useless-constructor': 'error',
		'no-var': 'error',
		'object-shorthand': ['error', 'always'],
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prefer-rest-params': 'error',
		'prefer-reflect': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'sort-imports': 'error',
		'require-yield': 'error',
		'template-curly-spacing': ['error', 'always'],
		'yield-star-spacing': ['error', {'before': true, 'after': false}]
  }
};