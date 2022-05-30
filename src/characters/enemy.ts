import { Player2 } from '../core/player/player';
import { RandomMovement } from '../movement/random-movement';
import { GameScene } from '../scenes/game';

const frameRate = 5;

export abstract class Enemy extends Player2 {
  protected constructor(
    scene: GameScene,
    name: string,
    tileX: number,
    tileY: number,
  ) {
    super(
      scene,
      name,
      tileX,
      tileY,
      [
        { key: 'initial', row: 1, frames: [0] },
        { key: 'up', row: 1, frames: [0, 1, 2] },
        { key: 'down', row: 2, frames: [0, 1, 2] },
        { key: 'right', row: 3, frames: [0, 1, 2] },
        { key: 'left', row: 4, frames: [0, 1, 2] },
        { key: 'death', row: 5, frames: [0, 1, 2, 3], repeat: 0 },
      ],
      5,
      frameRate,
    );

    this.movement = new RandomMovement(this);
    this.setDepth(2);
    this.setBounce(1, 1);
  }

  kill() {
    super.kill();
    this.movement?.stop();
  }
}
