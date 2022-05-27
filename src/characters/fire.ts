import { GameScene } from '../scenes/game';
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
import { Config } from '../config';
import { addAnimationToElement } from '../utils/add-animation-to-element';
import { Map } from '../core/map/map';
import { Brick } from './brick';
import Body = Phaser.Physics.Arcade.Body;
import { Axis, Direction, DirectionToOrientation } from '../utils/movement';
import { Player } from '../core/player/player';
import Tilemap = Phaser.Tilemaps.Tilemap;

const frameRate = 8;

function axisToTilePosition(axis: Axis, dir: Direction, length: number) {
  if (
    (axis === 'x' && (dir === 'up' || dir === 'down')) ||
    (axis === 'y' && (dir === 'right' || dir === 'left'))
  ) {
    return 0;
  }

  return length * (dir === 'up' || dir === 'left' ? -1 : 1);
}

function axisToDimension(dir: Direction, length: number) {
  return dir === 'up' || dir === 'down'
    ? {
        width: Config.graphics.tile.width,
        height: length * Config.graphics.tile.height,
      }
    : {
        width: length * Config.graphics.tile.width,
        height: Config.graphics.tile.height,
      };
}

export class Fire {
  group: Phaser.Physics.Arcade.Group;

  constructor(
    scene: GameScene,
    tile: { x: number; y: number },
    fireLength: number,
  ) {
    this.group = scene.physics.add.group({ defaultKey: 'fire' });
    const animations = [
      { key: 'center', row: 0, frames: [0, 1, 2, 3], repeat: 0 },
      { key: 'up', row: 1, frames: [0, 1, 2, 3], repeat: 0 },
      { key: 'down', row: 2, frames: [0, 1, 2, 3], repeat: 0 },
      { key: 'right', row: 3, frames: [0, 1, 2, 3], repeat: 0 },
      { key: 'left', row: 4, frames: [0, 1, 2, 3], repeat: 0 },
      { key: 'horizontal', row: 5, frames: [0, 1, 2, 3], repeat: 0 },
      { key: 'vertical', row: 6, frames: [0, 1, 2, 3], repeat: 0 },
    ];

    const directions = ['up', 'down', 'left', 'right'] as const;

    const sprite = this.#getSprite(animations);
    sprite.anims.play('center');
    sprite.setPosition(
      tile.x * Config.graphics.tile.width,
      tile.y * Config.graphics.tile.height,
    );

    for (const dir of directions) {
      const firstFireTile = {
        x:
          tile.x +
          axisToTilePosition('x', dir, dir === 'right' ? 1 : fireLength),
        y:
          tile.y +
          axisToTilePosition('y', dir, dir === 'down' ? 1 : fireLength),
      };

      const firstWorldXY = scene.tileMap.tileMap.tileToWorldXY(
        firstFireTile.x,
        firstFireTile.y,
      );
      const collisionDimension = axisToDimension(dir, fireLength);
      scene.tileMap.tileMap.getTilesWithinWorldXY(
        firstWorldXY.x + 1,
        firstWorldXY.y + 1,
        collisionDimension.width - 2,
        collisionDimension.height - 2,
        { isColliding: true },
      );

      const bodies = scene.physics.overlapRect(
        firstWorldXY.x + 1,
        firstWorldXY.y + 1,
        collisionDimension.width - 2,
        collisionDimension.height - 2,
        true,
        true,
      ) as Body[];

      // the collisions are ordered and with these directions we need to invert
      if (dir === 'right' || dir === 'down') {
        bodies.reverse();
      }

      const bricks = bodies.filter(b => b.gameObject?.name === Brick.name);

      const closestBrick = scene.physics.closest(sprite, bricks) as Body | null;

      for (let i = 1; i <= fireLength; i++) {
        const fireTile = {
          x: tile.x + axisToTilePosition('x', dir, i),
          y: tile.y + axisToTilePosition('y', dir, i),
        };
        if (Map.isSolidBlock(fireTile.x, fireTile.y)) {
          break;
        }

        const worldXY = scene.tileMap.tileMap.tileToWorldXY(
          fireTile.x,
          fireTile.y,
        );

        if (closestBrick && worldXY.equals(closestBrick)) {
          this.#killPlayers(bodies, fireTile, scene.tileMap.tileMap);
          break;
        }

        const sprite = this.#getSprite(animations);
        sprite.setPosition(worldXY.x, worldXY.y);
        if (i === fireLength) {
          sprite.anims.play(dir);
        } else {
          sprite.anims.play(DirectionToOrientation[dir]);
        }

        this.#killPlayers(bodies, fireTile, scene.tileMap.tileMap);
      }
    }
  }

  #getSprite(
    animations: {
      frames: number[];
      repeat: number;
      row: number;
      key: string;
    }[],
  ) {
    const sprite: SpriteWithDynamicBody = this.group.get();
    sprite.setOrigin(0, 0);
    sprite.setImmovable(true);
    sprite.setScale(2.5);
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
      sprite.destroy(),
    );
    addAnimationToElement('fire', animations, sprite.anims, 4, frameRate);

    return sprite;
  }

  #killPlayers(
    bodies: Phaser.Physics.Arcade.Body[],
    fireTile: { x: number; y: number },
    tileMap: Tilemap,
  ) {
    bodies
      .filter(b => {
        const tilePosition = tileMap.worldToTileXY(b.center.x, b.center.y);
        return tilePosition.equals(fireTile);
      })
      .forEach(b => (b.gameObject.getData('player') as Player).kill());
  }
}
