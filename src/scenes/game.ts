import { Scene } from 'phaser';
import { Config } from '../config';
import { TileMap } from '../core/map/tile-map';
import { Brick } from '../characters/brick';
import { Bomberman } from '../characters/bomberman';
import { Bomb } from '../characters/bomb';
import { Item } from '../characters/item';

const frameWidth = 16;
const frameHeight = 16;

export class GameScene extends Scene {
  tileMap!: TileMap;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('map', 'assets/map/map-items.png');
    this.load.spritesheet(Item.playerName, 'assets/map/items.png', {
      frameWidth,
      frameHeight,
    });
    this.load.spritesheet(Brick.playerName, 'assets/map/brick.png', {
      frameWidth,
      frameHeight,
    });
    this.load.spritesheet(Bomb.playerName, 'assets/map/bomb.png', {
      frameWidth,
      frameHeight,
    });
    this.load.spritesheet('fire', 'assets/map/fire.png', {
      frameWidth,
      frameHeight,
    });
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
