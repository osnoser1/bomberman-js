import { Player } from '../core/player/player';
import Group = Phaser.Physics.Arcade.Group;

const frameRate = 3;

export class Bomb extends Player {
  constructor(group: Group, tileX: number, tileY: number) {
    super(
      'bomb',
      group.get(),
      tileX,
      tileY,
      [{ key: 'initial', row: 0, frames: [0, 1, 2] }],
      6,
      frameRate,
      true,
    );
  }
}
