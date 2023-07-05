/// <reference types="vite/client" />
import { BlockElement } from '@blocksuite/lit';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { registerService } from '../__internal__/service.js';
import type { SymbolBlockModel } from './symbol-model.js';
import { SymbolBlockService } from './symbol-service.js';

@customElement('affine-symbol')
export class SymbolBlockComponent extends BlockElement<SymbolBlockModel> {
  static override styles = css`
    .affine-symbol-block-container {
      border: 1px solid white;
      position: relative;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    registerService('affine:symbol', SymbolBlockService);
  }

  override firstUpdated() {
    this.model.propsUpdated.on(() => this.requestUpdate());
    this.model.childrenUpdated.on(() => this.requestUpdate());
  }

  override render() {
    return html`
      <div class="affine-symbol-block-container">${this.content}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-symbol': SymbolBlockComponent;
  }
}
