import { Player } from '../core/player/player';
import { Bomberman } from './bomberman';
import { Fire } from './fire';
import { GameScene } from '../scenes/game';
import { getMapTilePosition } from '../utils/map';
import { Scene } from 'phaser';

const frameRate = 3;

export class Bomb extends Player {
  static playerName = 'bomb';

  #player: Bomberman;

  constructor(scene: Scene, player: Bomberman, tileX: number, tileY: number) {
    super(
      scene,
      Bomb.playerName,
      tileX,
      tileY,
      [
        { key: 'initial', row: 0, frames: [0, 1, 2] },
        { key: 'death', row: 0, frames: [3], repeat: 0 },
      ],
      4,
      frameRate,
    );
    this.#player = player;
    this.setDepth(1);

    if (!player.detonator) {
      setTimeout(() => {
        this.detonate();
      }, 3200);
    }
  }

  detonate() {
    if (!this.anims || this.anims.getName() === 'death') {
      return;
    }

    const scene = this.scene as GameScene;
    this.anims.play('death');
    this.kill();
    const tile = getMapTilePosition(this.getCenter());
    new Fire(scene, tile, this.#player.fireLength);
  }

  kill() {
    super.kill();
    this.anims?.complete();
  }
}
