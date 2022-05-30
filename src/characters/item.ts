import { Player2, Speed } from '../core/player/player';
import { Bomberman } from './bomberman';
import { Scene } from 'phaser';

export const ItemType = {
  FireUp: 'fire-up',
  BombUp: 'bomb-up',
  RemoteControl: 'remote-control',
  SpeedUp: 'speed-up',
  WallPass: 'wall-pass',
  BombPass: 'bomb-pass',
  FlamePass: 'flame-pass',
  Invincible: 'invincible',
  Door: 'door',
} as const;

const skillAction: Record<ItemTypeValue, (player: Bomberman) => void> = {
  [ItemType.FireUp]: player => player.fireLength++,
  [ItemType.BombUp]: player => player.bombLength++,
  [ItemType.RemoteControl]: player => (player.detonator = true),
  [ItemType.SpeedUp]: player => (player.speed = Speed.Fast),
  [ItemType.BombPass]: player => player.setBombPass(true),
  [ItemType.WallPass]: player => player.setWallPass(true),
  [ItemType.FlamePass]: player => (player.flamePass = true),
  [ItemType.Invincible]: () => {},
  [ItemType.Door]: () => {},
};

export type ItemTypeValue = typeof ItemType[keyof typeof ItemType];

export class Item extends Player2 {
  static readonly playerName = 'item';

  constructor(
    scene: Scene,
    public itemType: ItemTypeValue,
    tileX: number,
    tileY: number,
  ) {
    super(
      scene,
      Item.playerName,
      tileX,
      tileY,
      [
        { key: ItemType.FireUp, row: 0, frames: [0] },
        { key: ItemType.BombUp, row: 0, frames: [1] },
        { key: ItemType.RemoteControl, row: 0, frames: [2] },
        { key: ItemType.SpeedUp, row: 0, frames: [3] },
        { key: ItemType.BombPass, row: 0, frames: [4] },
        { key: ItemType.WallPass, row: 0, frames: [5] },
        { key: ItemType.FlamePass, row: 0, frames: [6] },
        { key: ItemType.Invincible, row: 0, frames: [7] },
        { key: ItemType.Door, row: 0, frames: [8] },
      ],
      9,
      1,
      false,
      itemType,
    );
  }

  applySkill(player: Bomberman) {
    skillAction[this.itemType]?.(player);
    this.kill();
  }
}
