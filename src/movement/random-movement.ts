import { Player } from '../core/player/player';
import { random } from 'lodash-es';
import { Input } from '../core/input/gamepad';
import Buttons = Input.Buttons;
import Gamepad = Input.Gamepad;

export enum RandomMovementType {
  Low,
  Mid,
  High,
  Impossible,
}

enum Movement {
  Left,
  Right,
  Up,
  Down,
}

export class RandomMovement {
  readonly #player: Player;
  readonly #gamepad: Gamepad;
  #buttons: Buttons[] = [];
  #intervalId?: number;

  constructor(player: Player) {
    this.#player = player;
    this.#gamepad = this.#player.gamepad;
    if (this.#player.movementType === RandomMovementType.Impossible) {
      throw new Error(`Impossible movement type hasn't been implemented`);
    }
  }

  start() {
    const func = () => {
      if (this.#player.movementType === RandomMovementType.Low) {
        this.makeMovement(random(0, 3));
      } else {
        this.makeMovement(random(0, 1), random(2, 3));
      }
    };
    func();
    this.#intervalId = setInterval(func, 3000);
  }

  stop() {
    clearInterval(this.#intervalId);
  }

  private makeMovement(first: Movement, second?: Movement) {
    this.#gamepad.pressMany(false, this.#buttons, false);
    this.#buttons = [];

    if (first === Movement.Left) {
      this.#buttons.push(Buttons.Left);
    } else if (first === Movement.Right) {
      this.#buttons.push(Buttons.Right);
    }

    if (first === Movement.Up || second === Movement.Up) {
      this.#buttons.push(Buttons.Up);
    } else if (first === Movement.Down || second === Movement.Down) {
      this.#buttons.push(Buttons.Down);
    }

    this.#gamepad.pressMany(true, this.#buttons);
  }
}
