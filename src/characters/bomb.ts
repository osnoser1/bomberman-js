import { Player } from '../core/player/player';
import { Bomberman } from './bomberman';
import { Fire } from './fire';
import { GameScene } from '../scenes/game';
import { getMapTilePosition } from '../utils/map';

const frameRate = 3;

export class Bomb extends Player {
  #player: Bomberman;

  constructor(
    group: Phaser.Physics.Arcade.Group,
    scene: GameScene,
    player: Bomberman,
    tileX: number,
    tileY: number,
  ) {
    super(
      'bomb',
      group.get(),
      tileX,
      tileY,
      [{ key: 'initial', row: 0, frames: [0, 1, 2] }],
      6,
      frameRate,
      true,
    );
    this.#player = player;

    if (!player.detonator) {
      setTimeout(() => {
        this.detonate(scene);
      }, 3200);
    }
  }

  detonate(scene: GameScene) {
    const tile = getMapTilePosition(this.sprite.getCenter());
    this.sprite.destroy();
    new Fire(scene, tile, this.#player.fireLength);
  }
}
