import { GameScene } from '../../scenes/game';
import { Map } from '../../core/map/map';
import { resolveEnemy } from '../utils/enemy-factory';
import '../';
import { Enemy } from '../enemy';

export class Enemies {
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group();
  }

  generateRandom(map: Map) {
    const scene = this.group.scene as GameScene;
    const enemies = map.randomEnemies();
    enemies.forEach(b => {
      const Enemy = resolveEnemy(b.type);
      const enemy = new Enemy(this.group.scene, b.x, b.y) as Enemy;
      this.group.add(enemy);

      const brickCollision = scene.physics.add.collider(
        enemy,
        scene.tileMap.bricks.group,
      );
      enemy.setData('brickCollision', brickCollision);

      scene.physics.add.collider(
        scene.tileMap.enemies.group,
        scene.tileMap.itemTileSetLayer,
      );

      enemy.applyWallPass();
      enemy.startMovement();
    });
  }
}
