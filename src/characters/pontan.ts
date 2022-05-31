import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';
import { GameScene } from '../scenes/game';

@enemy({ type: EnemyType.PONTAN })
export class Pontan extends Enemy {
  constructor(scene: GameScene, tileX: number, tileY: number) {
    super(scene, 'pontan', tileX, tileY, true);

    this.speed = Speed.Mid;
  }
}
