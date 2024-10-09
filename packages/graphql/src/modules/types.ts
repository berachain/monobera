import { DocumentTypeDecoration } from "@graphql-typed-document-node/core";

export type FragmentType<
  TDocumentType extends DocumentTypeDecoration<any, any>,
> = TDocumentType extends DocumentTypeDecoration<infer TType, any>
  ? [TType] extends [{ " $fragmentName"?: infer TKey }]
    ? TKey extends string
      ? { " $fragmentRefs"?: { [key in TKey]: TType } }
      : never
    : never
  : never;
