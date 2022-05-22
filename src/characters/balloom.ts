import Group = Phaser.Physics.Arcade.Group;
import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { RandomMovementType } from '../movement/random-movement';
import { Speed } from '../core/player/player';

@enemy({ type: EnemyType.BALLOOM })
export class Balloom extends Enemy {
  constructor(group: Group, tileX: number, tileY: number) {
    super('balloom', group.get(), tileX, tileY);

    this.speed = Speed.Slowest;
    this.movementType = RandomMovementType.Low;
    this.sprite.setDepth(1);
  }
}
