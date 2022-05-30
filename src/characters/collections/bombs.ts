import { GameScene } from '../../scenes/game';
import { Bomb } from '../bomb';
import { Bomberman } from '../bomberman';

export class Bombs {
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group({ defaultKey: Bomb.playerName });
  }

  addBomb(player: Bomberman, tileX: number, tileY: number) {
    new Bomb(this.group, player, tileX, tileY);
  }

  detonate() {
    const bomb: Bomb | undefined = this.group
      .getChildren()
      .at(0)
      ?.getData('player');
    bomb?.detonate();
  }
}
