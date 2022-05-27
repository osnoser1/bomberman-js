import { Player } from '../core/player/player';
import Group = Phaser.Physics.Arcade.Group;

const frameRate = 8;

export class Brick extends Player {
  constructor(group: Group, tileX: number, tileY: number) {
    super(
      Brick.name,
      group.get(),
      tileX,
      tileY,
      [
        { key: 'initial', row: 0, frames: [0] },
        { key: 'death', row: 5, frames: [0, 1, 2], repeat: 0 },
      ],
      6,
      frameRate,
      true,
    );
  }
}
