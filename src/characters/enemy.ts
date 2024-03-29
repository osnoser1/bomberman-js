import { Player } from '../core/player/player';
import { RandomMovement } from '../movement/random-movement';
import { GameScene } from '../scenes/game';
import Collider = Phaser.Physics.Arcade.Collider;

const frameRate = 5;

export abstract class Enemy extends Player {
  protected constructor(
    scene: GameScene,
    name: string,
    tileX: number,
    tileY: number,
    protected wallPass: boolean = false,
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

  applyWallPass() {
    const collider: Collider | undefined = this.getData('brickCollision');
    if (!collider) {
      throw new Error('collider is not defined');
    }

    collider.active = !this.wallPass;
  }
}
