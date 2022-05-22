import { GameScene } from '../../scenes/game';
import { Map } from '../../core/map/map';
import { resolveEnemy } from '../utils/enemy-factory';
import '../';
import { Player } from '../../core/player/player';
import { Enemy } from '../enemy';

export class Enemies {
  #enemies: Enemy[] = [];
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group({ defaultKey: 'brick' });
  }

  generateRandom(map: Map) {
    const enemies = map.randomEnemies();
    enemies.forEach(b => {
      const Enemy = resolveEnemy(b.type);
      const enemy = new Enemy(this.group, b.x, b.y) as Player;
      this.#enemies.push(enemy);
      enemy.movement?.start();
    });
  }

  update(_time: number, _delta: number) {
    this.#enemies.forEach(enemy => enemy.update(_time, _delta));
  }
}
