import { GameScene } from '../scenes/game';
import { Bombs } from './collections/bombs';
import { getMapTilePosition } from '../utils/map';
import { Player } from '../core/player/player';
import { TileMap } from '../core/map/tile-map';

const frameRate = 8;

// @ts-ignore
enum BombermanState {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export class Bomberman extends Player {
  readonly speed = 240;

  constructor(
    scene: GameScene,
    public bombs: Bombs,
    tileX: number,
    tileY: number,
  ) {
    const sprite = scene.physics.add.sprite(0, 0, 'bomberman');
    super(
      'bomberman',
      sprite,
      tileX,
      tileY,
      [
        { key: 'initial', row: 0, frames: [0] },
        { key: 'up', row: 1, frames: [2, 1, 0, 1] },
        { key: 'down', row: 2, frames: [2, 1, 0, 1] },
        { key: 'right', row: 3, frames: [2, 1, 0, 1] },
        { key: 'left', row: 4, frames: [2, 1, 0, 1] },
        { key: 'death', row: 5, frames: [0, 1, 2, 3, 4] },
      ],
      6,
      frameRate,
    );

    this.sprite.setDepth(1);
  }

  update(
    _time: number,
    _delta: number,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    input: Phaser.Input.InputPlugin,
    physics: Phaser.Physics.Arcade.ArcadePhysics,
    tileMap: TileMap,
  ) {
    if (cursors.right.isDown) {
      this.sprite.anims.play('right', true);
    } else if (cursors.left.isDown) {
      this.sprite.anims.play('left', true);
    } else if (cursors.up.isDown) {
      this.sprite.anims.play('up', true);
    } else if (cursors.down.isDown) {
      this.sprite.anims.play('down', true);
    }

    if (
      !cursors.right.isDown &&
      !cursors.left.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      this.sprite.anims.pause();
    }

    if (cursors.up.isDown) {
      this.sprite.setVelocityY(-this.speed);
    } else if (cursors.down.isDown) {
      this.sprite.setVelocityY(this.speed);
    } else {
      this.sprite.setVelocityY(0);
    }

    if (cursors.right.isDown) {
      this.sprite.setVelocityX(this.speed);
    } else if (cursors.left.isDown) {
      this.sprite.setVelocityX(-this.speed);
    } else {
      this.sprite.setVelocityX(0);
    }

    const bombKey = input.keyboard.addKey('C');
    if (
      input.keyboard.checkDown(bombKey) &&
      !physics.overlap(this.sprite, this.bombs.group) &&
      !physics.overlap(this.sprite, tileMap.bricks.group)
    ) {
      const center = this.sprite.getCenter();
      const { x: tileX, y: tileY } = getMapTilePosition(center.x, center.y);
      this.bombs.addBomb(tileX, tileY);
    }
  }
}
