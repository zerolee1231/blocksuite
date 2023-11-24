import { WithDisposable } from '@blocksuite/lit';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('slide-button')
export class SlideButton extends WithDisposable(LitElement) {
  static override styles = css`
    lable {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    input {
      opacity: 0;
      position: absolute;
    }

    span {
      position: relative;
      width: 36px;
      height: 18px;
      background: var(--affine-icon-color);
      border-radius: 37px;
      transition: 200ms all;
      border: 1px solid var(--affine-black-10);
      box-shadow: var(--affine-toggle-circle-shadow);
      display: inline-block;
    }

    span::before {
      transition: all 0.2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      top: 50%;
      border: 1px solid var(--affine-black-10);
      background: var(--affine-white);
      transform: translate(-1px, -50%);
    }

    .checked {
      background: var(--affine-primary-color);
    }

    .checked::before {
      background: var(--affine-toggle-circle-background-color);
      transform: translate(17px, -50%);
    }
  `;

  @property({ attribute: false })
  checked = false;

  @property({ attribute: false })
  onChange: (checked: boolean) => void = () => {};

  override render() {
    const { checked, onChange } = this;
    return html`
      <label>
        <input
          type="checkbox"
          value=${checked ? 'on' : 'off'}
          ?checked=${checked}
          @change=${(e: Event) =>
            onChange((e.target as HTMLInputElement).checked)}
        />
        <span class=${checked ? 'checked' : ''}></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'slide-button': SlideButton;
  }
}
