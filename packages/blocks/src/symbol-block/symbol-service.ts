import type { BaseBlockModel } from '@blocksuite/store';

import { BaseService } from '../__internal__/service/index.js';
import { addSerializedBlocks } from '../__internal__/service/json2block.js';
import type { SerializedBlock } from '../__internal__/utils/index.js';
import { SymbolRefBlockSchema } from '../divider-block/index.js';
import type { SymbolBlockModel } from './symbol-model.js';

export class SymbolBlockService extends BaseService<SymbolBlockModel> {
  init(model: SymbolBlockModel) {
    model.page.addBlock('affine:paragraph', {}, model.id);
  }
  override async json2Block(
    focusedBlockModel: BaseBlockModel,
    pastedBlocks: SerializedBlock[]
  ) {
    await addSerializedBlocks(
      focusedBlockModel.page,
      pastedBlocks,
      focusedBlockModel,
      0
    );
  }

  override block2Json(
    block: SymbolBlockModel,
    begin?: number,
    end?: number
  ): SerializedBlock {
    return {
      flavour: SymbolRefBlockSchema.model.flavour,
      ref: {
        pageId: block.page.id,
        blockId: block.id,
      },
      children: [],
    };
  }
}
