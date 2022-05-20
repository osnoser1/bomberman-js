import Group = Phaser.Physics.Arcade.Group;
import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';

@enemy({ type: EnemyType.BALLOOM })
export class Balloom extends Enemy {
  readonly speed = 120;

  constructor(group: Group, tileX: number, tileY: number) {
    super('balloom', group.get(), tileX, tileY);

    this.sprite.setDepth(1);
  }
}
