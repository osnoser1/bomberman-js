import { Enemy } from './enemy';
import { enemy, EnemyType } from './utils/enemy-factory';
import { Speed } from '../core/player/player';
import { GameScene } from '../scenes/game';

@enemy({ type: EnemyType.KONDORIA })
export class Kondoria extends Enemy {
  constructor(scene: GameScene, tileX: number, tileY: number) {
    super(scene, 'kondoria', tileX, tileY, true);

    this.speed = Speed.Slowest;
  }
}
