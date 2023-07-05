/// <reference types="@blocksuite/global" />
// Import models only, the bundled file should not include anything else.
import type { BlockSchema } from '@blocksuite/store';
import type { z } from 'zod';

import type { BookmarkBlockModel } from './bookmark-block/bookmark-model.js';
import { BookmarkBlockSchema } from './bookmark-block/bookmark-model.js';
import {
  type CodeBlockModel,
  CodeBlockSchema,
} from './code-block/code-model.js';
import type { DatabaseBlockModel } from './database-block/database-model.js';
import { DatabaseBlockSchema } from './database-block/database-model.js';
import type { SymbolRefBlockModel } from './divider-block/symbol-ref-model.js';
import { SymbolRefBlockSchema } from './divider-block/symbol-ref-model.js';
import type { ImageBlockModel } from './image-block/image-model.js';
import { ImageBlockSchema } from './image-block/image-model.js';
import type { ListBlockModel } from './list-block/list-model.js';
import { ListBlockSchema } from './list-block/list-model.js';
import type { NoteBlockModel } from './note-block/note-model.js';
import { NoteBlockSchema } from './note-block/note-model.js';
import type { PageBlockModel } from './page-block/page-model.js';
import { PageBlockSchema } from './page-block/page-model.js';
import type { ParagraphBlockModel } from './paragraph-block/paragraph-model.js';
import { ParagraphBlockSchema } from './paragraph-block/paragraph-model.js';
import type { SurfaceBlockModel } from './surface-block/surface-model.js';
import { SurfaceBlockSchema } from './surface-block/surface-model.js';
import type { SymbolBlockModel } from './symbol-block/index.js';
import { SymbolBlockSchema } from './symbol-block/index.js';

export type {
  BookmarkBlockModel,
  CodeBlockModel,
  DatabaseBlockModel,
  ImageBlockModel,
  ListBlockModel,
  NoteBlockModel,
  PageBlockModel,
  ParagraphBlockModel,
  SurfaceBlockModel,
  SymbolBlockModel,
  SymbolRefBlockModel,
};

/** Built-in first party block models built for affine */
export const AffineSchemas: z.infer<typeof BlockSchema>[] = [
  CodeBlockSchema,
  ParagraphBlockSchema,
  PageBlockSchema,
  ListBlockSchema,
  NoteBlockSchema,
  SymbolRefBlockSchema,
  ImageBlockSchema,
  SurfaceBlockSchema,
  BookmarkBlockSchema,
  SymbolBlockSchema,
  // DatabaseBlockSchema,
];

export const __unstableSchemas = [DatabaseBlockSchema] satisfies z.infer<
  typeof BlockSchema
>[];

// TODO support dynamic register
export type BlockSchemas = {
  'affine:code': CodeBlockModel;
  'affine:paragraph': ParagraphBlockModel;
  'affine:page': PageBlockModel;
  'affine:list': ListBlockModel;
  'affine:note': NoteBlockModel;
  'affine:divider': SymbolRefBlockModel;
  'affine:image': ImageBlockModel;
  'affine:surface': SurfaceBlockModel;
  'affine:database': DatabaseBlockModel;
  'affine:bookmark': BookmarkBlockModel;
  'affine:symbol': SymbolBlockModel;
};

export type Flavour = keyof BlockSchemas;
