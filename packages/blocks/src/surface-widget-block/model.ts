import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

export type SurfaceWidgetProps = {
  type: 'timer' | 'sticker' | 'vote';
  xywh: string;
  meta: {
    voters?: {
      user: string;
      id: number;
    }[];
  };
};

export const defaultSurfaceWidgetProps: SurfaceWidgetProps = {
  type: 'sticker',
  xywh: '[0,0,0,0]',
  meta: {},
};

export const SurfaceWidgetSchema = defineBlockSchema({
  flavour: 'affine:surface-widget',
  props: (): SurfaceWidgetProps => defaultSurfaceWidgetProps,
  metadata: {
    version: 1,
    role: 'content',
    parent: ['affine:surface'],
  },
});

export type SurfaceWidgetModel = SchemaToModel<typeof SurfaceWidgetSchema>;
