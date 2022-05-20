import { GameScene } from '../../scenes/game';
import { Bomb } from '../bomb';

export class Bombs {
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group({ defaultKey: 'bomb' });
  }

  addBomb(tileX: number, tileY: number) {
    new Bomb(this.group, tileX, tileY);
  }
}
