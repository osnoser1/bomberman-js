import { GameScene } from '../../scenes/game';
import { Map } from './map';
import { Config } from '../../config';
import { Bricks } from '../../characters/collections/bricks';
import { Enemies } from '../../characters/collections/enemies';

export class TileMap {
  readonly itemTileSetLayer: Phaser.Tilemaps.TilemapLayer;

  readonly #map: Map;
  readonly #tileMap: Phaser.Tilemaps.Tilemap;
  readonly bricks: Bricks;
  readonly enemies: Enemies;

  constructor(scene: GameScene) {
    this.#map = new Map();
    this.#tileMap = scene.make.tilemap({
      data: this.#map.emptyMap,
      width: Config.graphics.sceneWidth,
      height: Config.graphics.sceneHeight,
      tileWidth: Config.graphics.tileWidth,
      tileHeight: Config.graphics.tileHeight,
    });
    const itemsTileSet = this.#tileMap.addTilesetImage(
      'items',
      undefined,
      16,
      16,
    );
    this.itemTileSetLayer = this.#tileMap.createLayer(0, itemsTileSet);
    this.bricks = new Bricks(scene);
    this.enemies = new Enemies(scene);

    this.#tileMap.setCollision(0);
  }

  reset() {
    this.bricks.generateRandom(this.#map);
    this.enemies.generateRandom(this.#map);
  }

  update(_time: number, _delta: number) {}
}
