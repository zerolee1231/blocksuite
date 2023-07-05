import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export const SymbolBlockSchema = defineBlockSchema({
  flavour: 'affine:symbol',
  props: () => ({}),
  metadata: {
    version: 1,
    role: 'hub',
    parent: ['affine:note'],
    children: [
      'affine:paragraph',
      'affine:list',
      'affine:code',
      'affine:divider',
      'affine:database',
      'affine:image',
      'affine:bookmark',
    ],
  },
});

export type SymbolBlockModel = SchemaToModel<typeof SymbolBlockSchema>;
