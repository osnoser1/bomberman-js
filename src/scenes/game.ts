import { Scene } from 'phaser';
import { Config } from '../config';
import { Bomberman } from '../characters/bomberman';
import { Bombs } from '../characters/collections/bombs';
import { TileMap } from '../core/map/tile-map';
import { keyboardConnection } from '../core/input/keyboard-connection';
import { joystickConnection } from '../core/input/joystick';

const frameWidth = 16;
const frameHeight = 16;

export class GameScene extends Scene {
  private bomberman!: Bomberman;
  private bombs!: Bombs;
  tileMap!: TileMap;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('items', 'assets/map/items.png');
    this.load.spritesheet('brick', 'assets/map/brick.png', {
      frameWidth,
      frameHeight,
    });
    this.load.spritesheet('bomb', 'assets/map/bomb.png', {
      frameWidth,
      frameHeight,
    });
    [
      'bomberman',
      'balloom',
      'doll',
      'kondoria',
      'minvo',
      'oneal',
      'ovapi',
      'pass',
      'pontan',
    ].forEach(val =>
      this.load.spritesheet(val, `assets/players/${val}.png`, {
        frameWidth,
        frameHeight,
      }),
    );
  }

  create() {
    this.tileMap = new TileMap(this);
    this.tileMap.reset();

    this.cameras.main.setBounds(
      0,
      0,
      Config.graphics.sceneWidth,
      Config.graphics.sceneHeight,
    );
    this.physics.world.setBounds(
      0,
      0,
      Config.graphics.sceneWidth,
      Config.graphics.sceneHeight,
    );

    this.bombs = new Bombs(this);
    this.bomberman = new Bomberman(this, this.bombs, 1, 1);

    this.physics.add.collider(
      this.bomberman.sprite,
      this.tileMap.itemTileSetLayer,
    );
    this.physics.add.collider(this.bombs.group, this.tileMap.itemTileSetLayer);
    this.physics.add.collider(this.bombs.group, this.bombs.group);
    this.physics.add.collider(this.bomberman.sprite, this.bombs.group);
    this.physics.add.collider(this.tileMap.enemies.group, [
      this.bombs.group,
      this.tileMap.bricks.group,
    ]);
    this.physics.add.collider(
      this.tileMap.enemies.group,
      this.tileMap.itemTileSetLayer,
    );

    this.cameras.main.startFollow(this.bomberman.sprite, true);

    keyboardConnection(this.input.keyboard, this.bomberman as any);
    joystickConnection(this.bomberman as any);
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    this.bomberman.update(time, delta, this.physics, this.tileMap);
    this.tileMap.update(time, delta);
  }
}
