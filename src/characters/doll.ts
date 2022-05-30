import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';
import { GameScene } from '../scenes/game';

@enemy({ type: EnemyType.DOLL })
export class Doll extends Enemy {
  constructor(scene: GameScene, tileX: number, tileY: number) {
    super(scene, 'doll', tileX, tileY);

    this.speed = Speed.Slow;
  }
}
