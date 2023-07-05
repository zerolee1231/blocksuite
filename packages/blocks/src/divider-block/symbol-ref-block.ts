/// <reference types="vite/client" />
import { BlockElement } from '@blocksuite/lit';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { registerService } from '../__internal__/service.js';
import type { SymbolRefBlockModel } from './symbol-ref-model.js';
import { SymbolRefBlockService } from './symbol-ref-service.js';

@customElement('affine-symbol-ref')
export class SymbolRefBlockComponent extends BlockElement<SymbolRefBlockModel> {
  static override styles = css`
    .affine-symbol-ref-block-container {
      border: 1px solid white;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    registerService('affine:symbol-ref', SymbolRefBlockService);
  }

  override firstUpdated() {
    this.model.propsUpdated.on(() => this.requestUpdate());
    this.model.childrenUpdated.on(() => this.requestUpdate());
  }

  override render() {
    const ref = this.model.ref;
    if (!ref) {
      return html``;
    }
    const page = this.page.workspace.getPage(ref.pageId);
    if (!page) {
      return html``;
    }
    const model = page.getBlockById(ref.blockId);
    return html`
      <div class="affine-symbol-ref-block-container">
        ${repeat(
          model?.children ?? [],
          v => v.id,
          v => {
            return this.root.renderModel(v);
          }
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-symbol-ref': SymbolRefBlockComponent;
  }
}
