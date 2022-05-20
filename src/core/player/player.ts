import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
import { Config } from '../../config';
import { addAnimationToElement } from '../../utils/add-animation-to-element';
import { RandomMovement, RandomMovementType } from "../../movement/random-movement";

export class Player {
  movementType?: RandomMovementType;
  movement?: RandomMovement;

  constructor(
    public readonly name: string,
    public sprite: SpriteWithDynamicBody,
    tileX: number,
    tileY: number,
    animations: { frames: number[]; row: number; key: string }[],
    numberOfSpriteColumns: number,
    frameRate: number,
    immovable = false,
  ) {
    this.sprite.setOrigin(0, 0);
    this.sprite.setPosition(
      tileX * Config.graphics.tileWidth,
      tileY * Config.graphics.tileHeight,
    );

    this.sprite.setImmovable(immovable);
    this.sprite.setScale(2.5);

    addAnimationToElement(
      this.name,
      animations,
      this.sprite.anims,
      numberOfSpriteColumns,
      frameRate,
    );
    this.sprite.anims.play('initial');
  }
}
