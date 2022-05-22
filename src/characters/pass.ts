import Group = Phaser.Physics.Arcade.Group;
import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';

@enemy({ type: EnemyType.PASS })
export class Pass extends Enemy {
  constructor(group: Group, tileX: number, tileY: number) {
    super('pass', group.get(), tileX, tileY);

    this.speed = Speed.Mid;
    this.sprite.setDepth(1);
  }
}
