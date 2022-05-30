import Group = Phaser.Physics.Arcade.Group;
import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';

@enemy({ type: EnemyType.ONEAL })
export class Oneal extends Enemy {
  constructor(group: Group, tileX: number, tileY: number) {
    super('oneal', group.get(), tileX, tileY);

    this.speed = Speed.Slow;
  }
}
