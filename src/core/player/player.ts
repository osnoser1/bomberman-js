import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
import Gamepad = Input.Gamepad;
import Buttons = Input.Buttons;
import { Config } from '../../config';
import { addAnimationToElement } from '../../utils/add-animation-to-element';
import {
  RandomMovement,
  RandomMovementType,
} from '../../movement/random-movement';
import { Input } from '../input/gamepad';

export enum Speed {
  Slowest = 1,
  Slow,
  Mid = 4,
  Fast,
}

export abstract class Player {
  movementType?: RandomMovementType;
  movement?: RandomMovement;
  gamepad: Gamepad;
  speed!: Speed;

  protected constructor(
    public readonly name: string,
    public sprite: SpriteWithDynamicBody,
    tileX: number,
    tileY: number,
    animations: { frames: number[]; row: number; key: string }[],
    numberOfSpriteColumns: number,
    frameRate: number,
    immovable = false,
  ) {
    this.gamepad = new Gamepad();
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

    this.gamepad.addListener('change', this.#updateAnimation, this);
  }

  update(_time: number, _delta: number) {
    this.#updateMovement();
  }

  #updateAnimation(gamepad: Gamepad) {
    if (gamepad.isPressed(Buttons.Right)) {
      this.sprite.anims.play('right', true);
    } else if (gamepad.isPressed(Buttons.Left)) {
      this.sprite.anims.play('left', true);
    } else if (gamepad.isPressed(Buttons.Up)) {
      this.sprite.anims.play('up', true);
    } else if (gamepad.isPressed(Buttons.Down)) {
      this.sprite.anims.play('down', true);
    } else {
      this.sprite.anims.pause();
    }
  }

  #updateMovement() {
    if (this.gamepad.isPressed(Buttons.Up)) {
      this.sprite.setVelocityY(-this.speed * 30);
    } else if (this.gamepad.isPressed(Buttons.Down)) {
      this.sprite.setVelocityY(this.speed * 30);
    } else {
      this.sprite.setVelocityY(0);
    }

    if (this.gamepad.isPressed(Buttons.Right)) {
      this.sprite.setVelocityX(this.speed * 30);
    } else if (this.gamepad.isPressed(Buttons.Left)) {
      this.sprite.setVelocityX(-this.speed * 30);
    } else {
      this.sprite.setVelocityX(0);
    }
  }
}
