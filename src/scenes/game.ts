import { Scene } from 'phaser';
import { Config } from '../config';
import { TileMap } from '../core/map/tile-map';
import { Brick } from '../characters/brick';
import { Bomberman } from '../characters/bomberman';

const frameWidth = 16;
const frameHeight = 16;

export class GameScene extends Scene {
  tileMap!: TileMap;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('items', 'assets/map/items.png');
    this.load.spritesheet(Brick.name, 'assets/map/brick.png', {
      frameWidth,
      frameHeight,
    });
    this.load.spritesheet('bomb', 'assets/map/bomb.png', {
      frameWidth,
      frameHeight,
    });
    this.load.spritesheet('fire', 'assets/map/fire.png', {
      frameWidth,
      frameHeight,
    });
    [
      Bomberman.name,
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
    this.tileMap.reset(this);

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
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    this.tileMap.update(time, delta, this);
  }
}
