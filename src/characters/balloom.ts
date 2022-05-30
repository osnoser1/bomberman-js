import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { RandomMovementType } from '../movement/random-movement';
import { Speed } from '../core/player/player';
import { GameScene } from '../scenes/game';

@enemy({ type: EnemyType.BALLOOM })
export class Balloom extends Enemy {
  constructor(scene: GameScene, tileX: number, tileY: number) {
    super(scene, 'balloom', tileX, tileY);

    this.speed = Speed.Slowest;
    this.movementType = RandomMovementType.Low;
  }
}
