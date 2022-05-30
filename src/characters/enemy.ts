import { Player } from '../core/player/player';
import { RandomMovement } from '../movement/random-movement';
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

const frameRate = 5;

export abstract class Enemy extends Player {
  protected constructor(
    name: string,
    sprite: SpriteWithDynamicBody,
    tileX: number,
    tileY: number,
  ) {
    super(
      name,
      sprite,
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
    this.sprite.setDepth(2);
    this.sprite.setBounce(1, 1);
  }

  kill() {
    super.kill();
    this.movement?.stop();
  }
}
