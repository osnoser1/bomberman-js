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
import { Scene } from 'phaser';
import Sprite = Phaser.Physics.Arcade.Sprite;

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

export class Player extends Sprite {
  protected movement?: RandomMovement;
  movementType?: RandomMovementType;
  gamepad: Gamepad;
  speed!: Speed;

  constructor(
    scene: Scene,
    name: string,
    tileX: number,
    tileY: number,
    animations: {
      frames: number[];
      row: number;
      key: string;
      repeat?: number;
    }[],
    numberOfSpriteColumns: number,
    frameRate: number,
    initialState = 'initial',
  ) {
    super(scene, 0, 0, name);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.gamepad = new Gamepad();
    this.name = name;
    this.setOrigin(0, 0);
    this.setPosition(
      tileX * Config.graphics.tile.width,
      tileY * Config.graphics.tile.height,
    );

    this.setScale(2.5);

    addAnimationToElement(
      this.name,
      animations,
      this.anims,
      numberOfSpriteColumns,
      frameRate,
    );
    this.anims.play(initialState);

    this.gamepad.addListener('change', this.#updateAnimation, this);

    scene.events.on('update', this.update, this);
  }

  update(_time: number, _delta: number) {
    super.update(_time, _delta);
    if (this.anims) {
      this.#updateMovement();
    }
  }

  kill() {
    if (!this.anims.exists('death')) {
      this.scene.events.off('update', this.update, this);
      this.destroy();
      return;
    }

    this.anims.play('death');

    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.scene?.events.off('update', this.update, this);
      this.destroy();
    });
  }

  startMovement() {
    this.movement?.start();
  }

  #updateAnimation(gamepad: Gamepad) {
    if (this.anims.getName() === 'death') {
      return;
    }

    if (gamepad.isPressed(Buttons.Right)) {
      this.anims.play('right', true);
    } else if (gamepad.isPressed(Buttons.Left)) {
      this.anims.play('left', true);
    } else if (gamepad.isPressed(Buttons.Up)) {
      this.anims.play('up', true);
    } else if (gamepad.isPressed(Buttons.Down)) {
      this.anims.play('down', true);
    } else {
      this.anims.pause();
    }
  }

  #updateMovement() {
    if (this.anims.getName() === 'death') {
      this.setVelocity(0, 0);
      return;
    }

    const velocity = this.speed * 30;
    if (this.gamepad.isPressed(Buttons.Up)) {
      this.setVelocityY(-velocity);
    } else if (this.gamepad.isPressed(Buttons.Down)) {
      this.setVelocityY(velocity);
    } else {
      this.setVelocityY(0);
    }

    if (this.gamepad.isPressed(Buttons.Right)) {
      this.setVelocityX(velocity);
    } else if (this.gamepad.isPressed(Buttons.Left)) {
      this.setVelocityX(-velocity);
    } else {
      this.setVelocityX(0);
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

    const center = this.getCenter();
    const tileModule =
      center[axis] % Config.graphics.tile[AxisToDimension[axis]];
    const tilePosition = getMapTilePosition(center);
    if (isEven(tilePosition[axis])) {
      return;
    }

    if (tileModule >= 6 && tileModule < 20) {
      this.body.velocity[axis] = velocity;
    } else if (tileModule > 20 && tileModule < 34) {
      this.body.velocity[axis] = -velocity;
    } else {
      this.body.velocity[axis] = 0;
    }
  }
}
