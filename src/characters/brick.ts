import { Player2 } from '../core/player/player';
import { Item, ItemTypeValue } from './item';

const frameRate = 8;

export class Brick extends Player2 {
  static playerName = 'brick';

  readonly #itemType?: ItemTypeValue;

  constructor(
    scene: Phaser.Scene,
    itemGroup: Phaser.Physics.Arcade.Group,
    tileX: number,
    tileY: number,
    hasItem: ItemTypeValue | undefined,
  ) {
    super(
      scene,
      Brick.playerName,
      tileX,
      tileY,
      [
        { key: 'initial', row: 0, frames: [0] },
        { key: 'death', row: 5, frames: [0, 1, 2], repeat: 0 },
      ],
      6,
      frameRate,
      true,
    );

    this.#itemType = hasItem;
    this.setHiddenItem(itemGroup, tileX, tileY);
  }

  private setHiddenItem(
    itemGroup: Phaser.Physics.Arcade.Group,
    tileX: number,
    tileY: number,
  ) {
    if (!this.#itemType) {
      return;
    }

    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      new Item(itemGroup.get(), this.#itemType!, tileX, tileY);
    });
  }
}
