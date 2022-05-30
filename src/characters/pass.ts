import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';
import { GameScene } from '../scenes/game';

@enemy({ type: EnemyType.PASS })
export class Pass extends Enemy {
  constructor(scene: GameScene, tileX: number, tileY: number) {
    super(scene, 'pass', tileX, tileY);

    this.speed = Speed.Mid;
  }
}
