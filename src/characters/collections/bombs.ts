import { GameScene } from '../../scenes/game';
import { Bomb } from '../bomb';
import { Bomberman } from '../bomberman';

export class Bombs {
  group: Phaser.Physics.Arcade.Group;
  readonly #scene: GameScene;

  constructor(scene: GameScene) {
    this.#scene = scene;
    this.group = scene.physics.add.group({ defaultKey: 'bomb' });
  }

  addBomb(player: Bomberman, tileX: number, tileY: number) {
    new Bomb(this.group, this.#scene, player, tileX, tileY);
  }
}
