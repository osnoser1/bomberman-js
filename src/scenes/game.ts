import { Scene } from 'phaser';
import { Config } from '../config';
import { TileMap } from '../core/map/tile-map';
import { Brick } from '../characters/brick';
import { Bomberman } from '../characters/bomberman';
import { Bomb } from '../characters/bomb';
import { Item } from '../characters/item';
import ImageFrameConfig = Phaser.Types.Loader.FileTypes.ImageFrameConfig;

const frameWidth = 16;
const frameHeight = 16;

export class GameScene extends Scene {
  tileMap!: TileMap;

  constructor() {
    super('GameScene');
  }

  preload() {
    const frameConfig: ImageFrameConfig = { frameWidth, frameHeight };
    this.load.image('map', 'assets/map/map-items.png');
    this.load.spritesheet(Item.playerName, 'assets/map/items.png', frameConfig);
    this.load.spritesheet(
      Brick.playerName,
      'assets/map/brick.png',
      frameConfig,
    );
    this.load.spritesheet(Bomb.playerName, 'assets/map/bomb.png', frameConfig);
    this.load.spritesheet('fire', 'assets/map/fire.png', frameConfig);
    [
      Bomberman.playerName,
      'balloom',
      'doll',
      'kondoria',
      'minvo',
      'oneal',
      'ovapi',
      'pass',
      'pontan',
    ].forEach(val =>
      this.load.spritesheet(val, `assets/players/${val}.png`, frameConfig),
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
