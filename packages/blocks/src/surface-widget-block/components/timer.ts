import { WithDisposable } from '@blocksuite/lit';
import type { Page } from '@blocksuite/store';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

import type { SurfaceWidgetModel } from '../model.js';

@customElement('affine-surface-timer-widget')
export class TimerWidget extends WithDisposable(LitElement) {
  static override styles = css`
    .surface-widget-timer {
      display: inline-block;
      border-radius: 10px;
      background-color: #fff;
      position: relative;
      box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 10px 14px;
      text-align: center;
    }

    .surface-widget-timer .time {
      font-size: 40px;
      font-weight: 700;
      color: #333;
      text-align: center;
      line-height: 80px;
      font-family: 'DSEG7';
      position: relative;
      background-color: #f5f5f5;
      padding: 0 16px;
      margin-bottom: 6px;
    }

    .surface-widget-timer .time::before {
      content: '88:88';
      top: 0;
      left: 0;
      font-size: 40px;
      font-weight: 700;
      color: #eee;
      text-align: center;
      line-height: 80px;
      font-family: 'DSEG7';
      width: 100%;
      position: absolute;
    }

    .surface-widget-timer .time > .timenumber {
      position: relative;
      z-index: 1;
    }

    .surface-widget-timer .start-button {
      cursor: pointer;
      color: #888;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
      text-decoration: none;
      text-align: center;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 700;
      font-family: helvetica, arial, sans-serif;
      border-radius: 4px;
      border: 1px solid #bcbcbc;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      background-image: -webkit-linear-gradient(
        top,
        #fff 0%,
        #efefef 60%,
        #e1dfe2 100%
      );
    }
  `;

  private _displayRef = createRef<HTMLDivElement>();
  private _setTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private _timersMap = new Map<
    number,
    {
      id: string;
      timestamp: number;
    }[]
  >();

  page!: Page;
  model!: SurfaceWidgetModel;

  private _startTime = 0;
  private _currentTime = 5 * 60 * 1000;

  override connectedCallback() {
    super.connectedCallback();

    const updateTimer = () => {
      const states = this.page.awarenessStore.awareness.getStates();
      const timersMap = new Map<number, { id: string; timestamp: number }[]>();
      let latestTimer: { timestamp: number; id: string } | null = null;

      Array.from(states.entries()).forEach(([id, values]) => {
        if (!values.timer) return;
        timersMap.set(id, values.timer);
        values.timer.find(timer => {
          if (timer.id === this.model.id) {
            if (!latestTimer || timer.timestamp > latestTimer.timestamp) {
              latestTimer = timer;
            }
            return true;
          }

          return false;
        });
      });

      this._timersMap = timersMap;

      if (latestTimer) {
        if (
          this._startTime !==
          (latestTimer as { timestamp: number; id: string }).timestamp
        )
          this.startCountdown(
            (latestTimer as { timestamp: number; id: string }).timestamp
          );
      } else {
        this.clearCountdown();
      }
    };

    this.page.awarenessStore.awareness.on('change', updateTimer);

    this._disposables.add(() => {
      this.page.awarenessStore.awareness.off('change', updateTimer);
    });

    updateTimer();
  }

  private _startTimer() {
    const clientID = this.page.doc.clientID;
    const timers = (this._timersMap.get(clientID) || []).filter(timer => {
      return timer.id !== this.model.id;
    });
    const startTimestamp = this.startCountdown();

    timers.push({
      id: this.model.id,
      timestamp: startTimestamp,
    });

    this.page.awarenessStore.awareness.setLocalStateField('timer', timers);
  }

  private startCountdown(startTime = Date.now()) {
    this._startTime = startTime;
    if (this._setTimeoutId) clearTimeout(this._setTimeoutId);

    const totalTime = 5 * 60 * 1000;
    const update = () => {
      this._currentTime = Math.max(totalTime - (Date.now() - startTime), 0);
      this._displayTime();

      if (this._currentTime > 0) {
        this._setTimeoutId = setTimeout(update, 100);
      } else {
        this._setTimeoutId = null;
      }
    };

    update();
    return startTime;
  }

  private clearCountdown() {
    if (this._setTimeoutId) clearTimeout(this._setTimeoutId);
    this._setTimeoutId = null;
    this._currentTime = 5 * 60 * 1000;
    this._displayTime();
  }

  private _displayTime() {
    const { _currentTime } = this;
    const minu = Math.floor(_currentTime / 1000 / 60)
      .toString()
      .padStart(2, '0');
    const second = (Math.floor(_currentTime / 1000) % 60)
      .toString()
      .padStart(2, '0');

    const time = `${minu}:${second}`;

    if (this._displayRef.value) {
      this._displayRef.value.innerText = time;
    }
  }

  override render() {
    const { _currentTime } = this;
    const minu = Math.floor(_currentTime / 1000 / 60)
      .toString()
      .padStart(2, '0');
    const second = (Math.floor(_currentTime / 1000) % 60)
      .toString()
      .padStart(2, '0');

    return html`<div class="affine-surface-widget">
      <div class="surface-widget-timer">
        <div class="time">
          <div class="timenumber" ${ref(this._displayRef)}>
            ${minu}:${second}
          </div>
        </div>
        <button class="start-button" type="button" @click=${this._startTimer}>
          Start
        </button>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-surface-timer-widget': TimerWidget;
  }
}
