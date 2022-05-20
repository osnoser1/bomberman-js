import { random } from 'lodash-es';
import { EnemyType } from '../../characters/utils/enemy-factory';

const solidBlock = 0;
const freeSpace = 1;
const anyTile = Number.EPSILON;

export class Map {
  static readonly Columns = 31;
  static readonly Rows = 13;
  static readonly BrickCount = 55;
  static readonly EnemiesCount = 10;

  #map: number[][];
  #bricks: { x: number; y: number }[];
  #enemies: { type: EnemyType; x: number; y: number }[];

  constructor() {
    this.#map = this.#emptyMap(solidBlock, freeSpace);
    this.#bricks = [];
    this.#enemies = [];
  }

  get emptyMap() {
    return this.#emptyMap(solidBlock, freeSpace);
  }

  get value() {
    return this.#map;
  }

  randomBricks() {
    this.#map = this.#emptyMap(solidBlock, freeSpace);
    this.#bricks = [];

    for (let i = 0; i < Map.BrickCount; i++) {
      do {
        let column = random(Map.Columns - 2);
        let row = random(Map.Rows - 2);
        if ((column < 3 && row == 1) || (column == 1 && row < 3)) {
          continue;
        }

        if (this.#map[row][column] === freeSpace) {
          this.#bricks.push({ x: column, y: row });
          this.#map[row][column] = anyTile;
          break;
        }
      } while (true);
    }

    return this.#bricks;
  }

  randomEnemies() {
    this.#enemies = [];

    for (let i = 0; i < Map.EnemiesCount; i++) {
      do {
        let column = random(Map.Columns - 2);
        let row = random(Map.Rows - 2);
        let type: EnemyType = random(EnemyType.Length - 1);

        if (this.#map[row][column] === freeSpace) {
          this.#enemies.push({ x: column, y: row, type });
          this.#map[row][column] = anyTile;
          break;
        }
      } while (true);
    }

    return this.#enemies;
  }

  #emptyMap<T, K>(value: T, noValue: K): (K | T)[][];
  #emptyMap<T, K = undefined>(value: T, noValue?: K) {
    const map: (T | typeof noValue)[][] = [];

    for (let i = 0; i < Map.Rows; i++) {
      map.push([]);
      for (let j = 0; j < Map.Columns; j++) {
        const el =
          (i % 2 != 1 && j % 2 != 1) || i == 0 || i == 12 || j == 0 || j == 30
            ? value
            : noValue;
        map[i].push(el);
      }
    }

    return map;
  }
}
