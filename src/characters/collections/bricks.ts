import { GameScene } from '../../scenes/game';
import { Map } from '../../core/map/map';
import { Brick } from '../brick';
import { random } from 'lodash-es';
import { Item, ItemType } from '../item';

export class Bricks {
  group: Phaser.Physics.Arcade.Group;
  itemsGroup: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.group = scene.physics.add.group({
      defaultKey: Brick.playerName,
      immovable: true,
    });
    this.itemsGroup = scene.physics.add.group({ defaultKey: Item.playerName });
  }

  generateRandom(map: Map) {
    const bricks = map.randomBricks();

    const itemIndex = random(bricks.length - 1);
    const itemTypeValues = Object.values(ItemType);

    bricks.forEach((b, i) => {
      // Not generate door item
      const itemType = itemTypeValues[random(itemTypeValues.length - 2)];
      // TODO: modify this condition to generate only one power-up
      const item = itemIndex === i ? ItemType.Door : itemType;
      const brick = new Brick(
        this.group.scene,
        this.itemsGroup,
        b.x,
        b.y,
        item,
      );
      this.group.add(brick, true);
    });
  }
}
