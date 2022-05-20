import Group = Phaser.Physics.Arcade.Group;
import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';

@enemy({ type: EnemyType.KONDORIA })
export class Kondoria extends Enemy {
  readonly speed = 120;

  constructor(group: Group, tileX: number, tileY: number) {
    super('kondoria', group.get(), tileX, tileY);

    this.sprite.setDepth(1);
  }
}
