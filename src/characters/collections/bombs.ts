import { GameScene } from '../../scenes/game';
import { Bomb } from '../bomb';
import { Bomberman } from '../bomberman';

export class Bombs {
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group({
      defaultKey: Bomb.playerName,
      immovable: true,
    });
  }

  addBomb(player: Bomberman, tileX: number, tileY: number) {
    const bomb = new Bomb(this.group.scene, player, tileX, tileY);
    this.group.add(bomb);
  }

  detonate() {
    const bomb = this.group.getChildren().at(0) as Bomb | undefined;
    bomb?.detonate();
  }
}
