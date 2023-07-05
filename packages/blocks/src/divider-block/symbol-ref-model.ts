import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export const SymbolRefBlockSchema = defineBlockSchema({
  flavour: 'affine:symbol-ref',
  props: (): {
    ref?: {
      pageId: string;
      blockId: string;
    };
  } => ({ ref: undefined }),
  metadata: {
    version: 1,
    role: 'content',
    children: [],
  },
});

export type SymbolRefBlockModel = SchemaToModel<typeof SymbolRefBlockSchema>;
