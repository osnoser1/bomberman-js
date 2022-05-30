import { GameScene } from '../../scenes/game';
import { Map } from './map';
import { Config } from '../../config';
import { Bricks } from '../../characters/collections/bricks';
import { Enemies } from '../../characters/collections/enemies';
import { Players } from '../../characters/collections/players';

export class TileMap {
  readonly itemTileSetLayer: Phaser.Tilemaps.TilemapLayer;

  readonly #map: Map;
  readonly tileMap: Phaser.Tilemaps.Tilemap;
  readonly bricks: Bricks;
  readonly enemies: Enemies;
  readonly players: Players;

  constructor(scene: GameScene) {
    this.#map = new Map();
    this.tileMap = scene.make.tilemap({
      data: this.#map.emptyMap,
      width: Config.graphics.sceneWidth,
      height: Config.graphics.sceneHeight,
      tileWidth: Config.graphics.tile.width,
      tileHeight: Config.graphics.tile.height,
    });
    const itemsTileSet = this.tileMap.addTilesetImage('map', undefined, 16, 16);
    this.itemTileSetLayer = this.tileMap.createLayer(0, itemsTileSet);
    this.bricks = new Bricks(scene);
    this.players = new Players(scene, this.bricks);
    this.enemies = new Enemies(scene);

    this.tileMap.setCollision(0);
  }

  reset(scene: GameScene) {
    this.players.addPlayer(scene, 1, 1);
    this.bricks.generateRandom(this.#map);
    this.enemies.generateRandom(this.#map);
  }

  update(time: number, delta: number, scene: GameScene) {
    this.players.update(time, delta, scene.physics);
    this.enemies.update(time, delta);
  }
}
