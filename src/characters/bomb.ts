import { Player } from '../core/player/player';
import { Bomberman } from './bomberman';
import { Fire } from './fire';
import { GameScene } from '../scenes/game';
import { getMapTilePosition } from '../utils/map';

const frameRate = 3;

export class Bomb extends Player {
  static playerName = 'bomb';

  #player: Bomberman;

  constructor(
    group: Phaser.Physics.Arcade.Group,
    player: Bomberman,
    tileX: number,
    tileY: number,
  ) {
    super(
      Bomb.playerName,
      group.get(),
      tileX,
      tileY,
      [
        { key: 'initial', row: 0, frames: [0, 1, 2] },
        { key: 'death', row: 0, frames: [3], repeat: 0 },
      ],
      4,
      frameRate,
      true,
    );
    this.#player = player;

    if (!player.detonator) {
      setTimeout(() => {
        this.detonate();
      }, 3200);
    }
  }

  detonate() {
    if (!this.sprite.anims || this.sprite.anims.getName() === 'death') {
      return;
    }

    const scene = this.sprite.scene as GameScene;
    this.sprite.anims.play('death');
    this.kill();
    const tile = getMapTilePosition(this.sprite.getCenter());
    new Fire(scene, tile, this.#player.fireLength);
  }

  kill() {
    super.kill();
    this.sprite.anims?.complete();
  }
}
