import Group = Phaser.Physics.Arcade.Group;
import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';

@enemy({ type: EnemyType.DOLL })
export class Doll extends Enemy {
  constructor(group: Group, tileX: number, tileY: number) {
    super('doll', group.get(), tileX, tileY);

    this.speed = Speed.Slow;
    this.sprite.setDepth(1);
  }
}
