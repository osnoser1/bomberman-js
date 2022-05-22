import EventEmitter = Phaser.Events.EventEmitter;
import { isNaN, mapValues, omitBy } from 'lodash-es';

export namespace Input {
  export enum Buttons {
    Up,
    Down,
    Left,
    Right,
    A,
    B,
    Start,
    None,
  }

  export class Gamepad extends EventEmitter {
    #buttons: Record<Buttons, ButtonState> = {
      ...(omitBy(
        mapValues(Buttons, () => new ButtonState(false, true)),
        (_, key) => isNaN(Number(key)),
      ) as Record<Buttons, ButtonState>),
      [Buttons.None]: new ButtonState(true, true),
    };

    isPressed(button: Buttons) {
      return this.#buttons[button].isPressed();
    }

    press(button: Buttons, pressed: boolean, emit = true) {
      if (!this.#buttons[button].isEnabled()) {
        return;
      }

      this.#buttons[button].setPressed(pressed);
      if (emit) {
        this.emit('change', this);
      }
    }

    pressMany(pressed: boolean, buttons: Buttons[], emit = true) {
      buttons.forEach(b => {
        if (!this.#buttons[b].isEnabled()) {
          return;
        }

        this.#buttons[b].setPressed(pressed);
      });

      if (emit) {
        this.emit('change', this);
      }
    }
  }

  class ButtonState {
    #pressed: boolean;
    readonly #enabled: boolean;

    constructor(pressed: boolean, enabled: boolean) {
      this.#pressed = pressed;
      this.#enabled = enabled;
    }

    public isPressed() {
      return this.#pressed;
    }

    public setPressed(pressed: boolean) {
      this.#pressed = pressed;
    }

    public isEnabled() {
      return this.#enabled;
    }
  }
}
