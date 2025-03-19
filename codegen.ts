import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    'src/graphql/schema/uniswap.graphql',
    'src/graphql/schema/aave.graphql',
    'src/graphql/schema/compound.graphql'
  ],
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request'
      ],
      config: {
        rawRequest: true,
        inlineFragmentTypes: 'combine'
      }
    }
  }
};

export default config;
