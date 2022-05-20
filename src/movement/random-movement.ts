import { Player } from '../core/player/player';
import { random } from 'lodash-es';

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
  #intervalId?: number;

  constructor(player: Player) {
    this.#player = player;
    if (this.#player.movementType === RandomMovementType.Impossible) {
      throw new Error(`Impossible movement type hasn't been implemented`);
    }
  }

  start() {
    this.#intervalId = setInterval(() => {
      if (this.#player.movementType === RandomMovementType.Low) {
        this.makeMovement(random(0, 3));
      } else {
        this.makeMovement(random(0, 1), random(2, 3));
      }
    }, 2000);
  }

  stop() {
    clearInterval(this.#intervalId);
  }

  private makeMovement(first: Movement, second?: Movement) {
    let x = 0;
    let y = 0;
    if (first === Movement.Left) {
      x = -1;
    } else if (first === Movement.Right) {
      x = 1;
    }

    if (first === Movement.Up || second === Movement.Up) {
      y = -1;
    } else if (first === Movement.Down || second === Movement.Down) {
      y = 1;
    }

    this.#player.sprite.setVelocity(x * 32, y * 32);
  }
}
