import { GameScene } from '../../scenes/game';
import { Map } from '../../core/map/map';
import { resolveEnemy } from '../utils/enemy-factory';
import '../';
import { Player2 } from '../../core/player/player';
import { Brick } from '../brick';

export class Enemies {
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group({ defaultKey: Brick.playerName });
  }

  generateRandom(map: Map) {
    const enemies = map.randomEnemies();
    enemies.forEach(b => {
      const Enemy = resolveEnemy(b.type);
      const enemy = new Enemy(this.group.scene, b.x, b.y) as Player2;
      this.group.add(enemy);
      enemy.startMovement();
    });
  }
}
