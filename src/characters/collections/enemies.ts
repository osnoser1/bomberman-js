import { GameScene } from '../../scenes/game';
import { Map } from '../../core/map/map';
import { resolveEnemy } from '../utils/enemy-factory';
import '../';
import { Player } from "../../core/player/player";

export class Enemies {
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group({ defaultKey: 'brick' });
  }

  generateRandom(map: Map) {
    const enemies = map.randomEnemies();
    enemies.forEach(b => {
      const Enemy = resolveEnemy(b.type);
      const enemy = new Enemy(this.group, b.x, b.y) as Player;
      enemy.movement?.start();
    });
  }
}
