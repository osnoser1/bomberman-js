import { GameScene } from '../scenes/game';
import { Bombs } from './collections/bombs';
import { getMapTilePosition } from '../utils/map';
import { Player, Speed } from '../core/player/player';
import { TileMap } from '../core/map/tile-map';
import { Input } from '../core/input/gamepad';
import { keyboardConnection } from '../core/input/keyboard-connection';
import { joystickConnection } from '../core/input/joystick';
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
import Buttons = Input.Buttons;

const frameRate = 6;

// @ts-ignore
enum BombermanState {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export class Bomberman extends Player {
  static playerName = 'bomberman';

  bombs: Bombs;
  bombLength: number;
  detonator: boolean;
  fireLength: number;

  readonly #destroyKeyboardConnection: () => void;
  readonly #destroyGamepadConnection: () => void;

  constructor(
    sprite: SpriteWithDynamicBody,
    scene: GameScene,
    tileX: number,
    tileY: number,
  ) {
    super(
      Bomberman.playerName,
      sprite,
      tileX,
      tileY,
      [
        { key: 'initial', row: 0, frames: [0] },
        { key: 'up', row: 1, frames: [2, 1, 0, 1] },
        { key: 'down', row: 2, frames: [2, 1, 0, 1] },
        { key: 'right', row: 3, frames: [2, 1, 0, 1] },
        { key: 'left', row: 4, frames: [2, 1, 0, 1] },
        { key: 'death', row: 5, frames: [0, 1, 2, 3, 4], repeat: 0 },
      ],
      6,
      frameRate,
    );

    this.bombs = new Bombs(scene);
    this.speed = Speed.Mid;
    this.detonator = false;
    this.fireLength = 2;
    this.bombLength = 1;

    this.sprite.setDepth(1);
    this.#destroyKeyboardConnection = keyboardConnection(
      scene.input.keyboard,
      this as any,
    );
    this.#destroyGamepadConnection = joystickConnection(this as any);
  }

  #updateActions(
    physics: Phaser.Physics.Arcade.ArcadePhysics,
    tileMap: TileMap,
  ) {
    if (
      this.gamepad.isPressed(Buttons.A) &&
      this.bombs.group.getLength() < this.bombLength &&
      !physics.overlap(this.sprite, this.bombs.group) &&
      !physics.overlap(this.sprite, tileMap.bricks.group)
    ) {
      const center = this.sprite.getCenter();
      const { x: tileX, y: tileY } = getMapTilePosition(center);
      this.bombs.addBomb(this, tileX, tileY);
    }

    if (this.gamepad.isPressed(Buttons.B) && this.detonator) {
      this.bombs.detonate();
      this.gamepad.press(Buttons.B, false);
    }
  }

  // @ts-ignore
  update(
    _time: number,
    _delta: number,
    physics: Phaser.Physics.Arcade.ArcadePhysics,
    tileMap: TileMap,
  ) {
    super.update(_time, _delta);
    this.#updateActions(physics, tileMap);
  }

  kill() {
    super.kill();
    this.#destroyKeyboardConnection();
    this.#destroyGamepadConnection();
  }

  setBombPass(_value: boolean) {
    this.sprite.scene.physics.world.colliders
      .getActive()
      .filter(c => c.name === 'playerBombsCollision')
      .forEach(c => c.destroy());
  }

  setWallPass(_value: boolean) {
    this.sprite.scene.physics.world.colliders
      .getActive()
      .filter(c => c.name === 'playerBrickCollision')
      .forEach(c => c.destroy());
  }

  setFlamePass(_value: boolean) {}
}
