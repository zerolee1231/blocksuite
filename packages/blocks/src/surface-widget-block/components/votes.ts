import { WithDisposable } from '@blocksuite/lit';
import type { Page } from '@blocksuite/store';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { remoteColorManager } from '../../page-block/remote-color-manager/index.js';
import type { SurfaceWidgetModel } from '../model.js';

@customElement('affine-surface-vote-widget')
export class VoteWidget extends WithDisposable(LitElement) {
  static override styles = css`
    :host {
      display: block;
      position: relative;
    }

    .element-inner-position {
      position: absolute;
      left: 0;
      top: 0;
    }

    .upvote-button {
      cursor: pointer;
    }

    .voter-wrapper {
      width: 10px;
      overflow-x: visible;
      display: inline-block;
    }

    .voter {
      display: inline-block;
      box-sizing: border-box;
      font-size: 14px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      padding-left: 6px;
      border-radius: 50%;
      font-weight: bolder;
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border: 2px solid rgba(255, 255, 255, 0.4);
    }

    .voter.
  `;

  page!: Page;
  model!: SurfaceWidgetModel;

  upvote() {
    const voters = this.model.meta.voters || [];

    const idx = voters.findIndex(vote => vote.id === this.page.doc.clientID);

    if (idx !== -1) {
      voters.splice(idx, 1);
    } else {
      voters.push({
        id: this.page.doc.clientID,
        user: 'Unknown',
      });
    }

    this.page.updateBlock(this.model, {
      meta: {
        voters,
      },
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this._disposables.add(
      this.page.slots.yBlockUpdated.on(({ id }) => {
        if (id === this.model.id) {
          this.requestUpdate();
        }
      })
    );
  }

  override render() {
    const voters = this.model.meta.voters || [];

    return html`<div class="affine-surface-widget">
      <div class="surface-vote-widget">
        <div
          class="upvote-button"
          style="
            height: 126px;
            width: 120px;
            transform: matrix(1, 0, 2.08167e-15, 1, 0, 0);
            left: 134.595px;
            top: 8px;
          "
          @click=${this.upvote}
        >
          <div
            class="element-inner"
            style="
              text-align: center;
              line-height: 1.2;
              width: 120px;
              height: 126px;
              transform: scale(1);
              overflow: visible;
            "
          >
            <div class="element-inner-position">
              <div
                class="element-inner-content middle-h is-list--digit-1"
                style="width: 120px; height: 126px; padding: 0px;"
              >
                <div
                  class="element-main"
                  style="
                    font-family: sans-serif;
                    font-size: 105px;
                    letter-spacing: 0px;
                    vertical-align: top;
                    color: rgb(255, 255, 255);
                    transform-origin: 0px 0px;
                    min-height: 126px;
                    width: calc(100% + 0px);
                    height: auto;
                    -webkit-text-stroke: 16.8997px rgb(255, 255, 255);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    -webkit-text-fill-color: linear-gradient(
                      0deg,
                      rgb(255, 142, 193) 4%,
                      rgb(255, 152, 185) 14%,
                      rgb(255, 142, 193) 30%,
                      rgb(255, 188, 156) 45%,
                      rgb(255, 234, 119) 73%,
                      rgb(255, 234, 119) 85%
                    );
                  "
                >
                  <span
                    data-customize="1"
                    style="
                      font-style: normal;
                      font-weight: 700;
                      text-decoration: none;
                    "
                    >+${voters.length}</span
                  >
                </div>
              </div>
            </div>
            <div class="element-inner-position">
              <div
                class="element-inner-content middle-h is-list--digit-1"
                style="width: 120px; height: 126px; padding: 0px;"
              >
                <div
                  class="element-main"
                  style="
                    font-family: sans-serif;
                    font-size: 105px;
                    letter-spacing: 0px;
                    vertical-align: top;
                    color: rgb(255, 255, 255);
                    transform-origin: 0px 0px;
                    min-height: 126px;
                    width: calc(100% + 0px);
                    height: auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-image: linear-gradient(180deg, rgba(251,118,118,1) 0%, rgba(240,49,49,1) 50%, rgba(221,12,12,1) 100%);
                  "
                >
                  <span
                    data-customize="1"
                    style="
                      /* font-style: normal; */
                      font-weight: 700;
                      /* text-decoration: none; */
                    "
                    >+${voters.length}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 120px; text-align: center; white-space: nowrap;">
        ${repeat(
          voters,
          vote => vote.id,
          vote => html`
            <div class="voter-wrapper">
              <div
                class="voter"
                style="background-color: ${remoteColorManager.get(vote.id)}"
              >
                ${vote.user}
              </div>
            </div>
          `
        )}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-surface-vote-widget': VoteWidget;
  }
}
