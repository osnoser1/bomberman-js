import { GameScene } from '../../scenes/game';
import { Map } from '../../core/map/map';
import { Brick } from '../brick';

export class Bricks {
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group({ defaultKey: 'brick' });
  }

  generateRandom(map: Map) {
    const bricks = map.randomBricks();
    bricks.forEach(b => new Brick(this.group, b.x, b.y));
  }
}
