import Group = Phaser.Physics.Arcade.Group;
import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';

@enemy({ type: EnemyType.KONDORIA })
export class Kondoria extends Enemy {
  constructor(group: Group, tileX: number, tileY: number) {
    super('kondoria', group.get(), tileX, tileY);

    this.speed = Speed.Slowest;
  }
}
