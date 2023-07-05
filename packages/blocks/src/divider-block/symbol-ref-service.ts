import type { BaseBlockModel } from '@blocksuite/store';

import type {
  BlockTransformContext,
  SerializedBlock,
} from '../__internal__/index.js';
import { BaseService } from '../__internal__/service/index.js';
import { addSerializedBlocks } from '../__internal__/service/json2block.js';
import type { SymbolRefBlockModel } from './symbol-ref-model.js';

export class SymbolRefBlockService extends BaseService<SymbolRefBlockModel> {
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

  override block2html(
    block: SymbolRefBlockModel,
    { childText = '', begin, end }: BlockTransformContext = {}
  ): string {
    return `<hr/>`;
  }
}
