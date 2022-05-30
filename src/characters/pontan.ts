import Group = Phaser.Physics.Arcade.Group;
import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';

@enemy({ type: EnemyType.PONTAN })
export class Pontan extends Enemy {
  constructor(group: Group, tileX: number, tileY: number) {
    super('pontan', group.get(), tileX, tileY);

    this.speed = Speed.Mid;
  }
}
