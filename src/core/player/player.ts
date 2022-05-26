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
import { getMapTilePosition } from '../../utils/map';
import { isEven } from '../../utils/math';

export enum Speed {
  Slowest = 1,
  Slow,
  Mid = 4,
  Fast,
}

const AxisToButton = {
  x: [Buttons.Left, Buttons.Right],
  y: [Buttons.Up, Buttons.Down],
};

const AxisToDimension = {
  x: 'width',
  y: 'height',
} as const;

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
      tileX * Config.graphics.tile.width,
      tileY * Config.graphics.tile.height,
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
    const velocity = this.speed * 30;
    if (this.gamepad.isPressed(Buttons.Up)) {
      this.sprite.setVelocityY(-velocity);
    } else if (this.gamepad.isPressed(Buttons.Down)) {
      this.sprite.setVelocityY(velocity);
    } else {
      this.sprite.setVelocityY(0);
    }

    if (this.gamepad.isPressed(Buttons.Right)) {
      this.sprite.setVelocityX(velocity);
    } else if (this.gamepad.isPressed(Buttons.Left)) {
      this.sprite.setVelocityX(-velocity);
    } else {
      this.sprite.setVelocityX(0);
    }

    if (this.gamepad.isPressed(Buttons.Right, Buttons.Left)) {
      this.handleExtraMovement(velocity, 'y');
    }

    if (this.gamepad.isPressed(Buttons.Up, Buttons.Down)) {
      this.handleExtraMovement(velocity, 'x');
    }
  }

  private handleExtraMovement(velocity: number, axis: 'x' | 'y') {
    if (this.gamepad.isPressed(...AxisToButton[axis])) {
      return;
    }

    const center = this.sprite.getCenter();
    const tileModule =
      center[axis] % Config.graphics.tile[AxisToDimension[axis]];
    const tilePosition = getMapTilePosition(center.x, center.y);
    if (isEven(tilePosition[axis])) {
      return;
    }

    if (tileModule >= 6 && tileModule < 20) {
      this.sprite.body.velocity[axis] = velocity;
    } else if (tileModule > 20 && tileModule < 34) {
      this.sprite.body.velocity[axis] = -velocity;
    } else {
      this.sprite.body.velocity[axis] = 0;
    }
  }
}
