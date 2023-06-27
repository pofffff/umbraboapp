module.exports = {
  root: true,
  extends: ['@react-native', 'prettier', 'plugin:react/jsx-runtime'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    'prettier/prettier': 'error',
    'semi': ['error', 'never']
  }
}
