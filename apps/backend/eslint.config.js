import { eslint } from '@siberiacancode/eslint';

export default eslint({
  typescript: true
},
{
  name: 'pokeworld/backend/rewrite',
  rules: {
    'node/prefer-global/process': 'off',
    'ts/consistent-type-imports': 'off',
    'consistent-type-imports': 'off'
  },
});
