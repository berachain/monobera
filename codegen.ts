import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    ['./packages/graphql/src/modules/balancer/generated/schema.graphql']: {
      schema: process.env.NEXT_PUBLIC_BALANCER_API_URL,
      plugins: ['schema-ast'],
    },
    [`./packages/graphql/src/modules/balancer//generated/`]: {
      schema: process.env.NEXT_PUBLIC_BALANCER_API_URL,
      documents: ['./packages/graphql/src/modules/balancer/**/*.graphql'],
      preset: 'client',
      config: {
        nonOptionalTypename: true,
        scalars: {
          BigInt: 'string',
          BigDecimal: 'string',
          Bytes: 'string',
          AmountHumanReadable: 'string',
          GqlBigNumber: 'string',
        },
      },
    },
  },
  // hooks: {
  //   afterAllFileWrite: ['pnpm run lint:fix'],
  // },
}

export default config
