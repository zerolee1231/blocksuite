import { noop } from '@blocksuite/global/utils';
import { BlockElement } from '@blocksuite/lit';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { deserializeXYWH } from '../index.js';
import { TimerWidget } from './components/timer.js';
import { VoteWidget } from './components/votes.js';
import type { SurfaceWidgetModel } from './model.js';

noop(TimerWidget);
noop(VoteWidget);

@customElement('affine-surface-widget')
export class SurfaceWidgetElement extends BlockElement<SurfaceWidgetModel> {
  static override styles = css`
    .affine-surface-widget {
      position: absolute;
      left: 0;
      top: 0;
      contain: size layout;
    }
  `;

  override render() {
    let widget;

    const [x, y] = deserializeXYWH(this.model.xywh);
    switch (this.model.type) {
      case 'sticker':
      case 'timer':
        widget = html`<affine-surface-timer-widget
          .page=${this.page}
          .model=${this.model}
        ></affine-surface-timer-widget>`;
        break;
      case 'vote':
        widget = html`<affine-surface-vote-widget
          .page=${this.page}
          .model=${this.model}
        ></affine-surface-vote-widget>`;
        break;
    }

    return html`<div
      class="affine-surface-widget"
      style="transform: translate(${x}px, ${y}px)"
    >
      ${widget}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-surface-widget': SurfaceWidgetElement;
  }
}
