import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';
import { GameScene } from '../scenes/game';

@enemy({ type: EnemyType.MINVO })
export class Minvo extends Enemy {
  constructor(scene: GameScene, tileX: number, tileY: number) {
    super(scene, 'minvo', tileX, tileY);

    this.speed = Speed.Mid;
  }
}
