import { GameScene } from '../../scenes/game';
import { Bomberman } from '../bomberman';
import { Bricks } from './bricks';
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;
import { Item, ItemType } from '../item';
import { collision } from '../../utils/collision';

export class Players {
  group: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene, bricks: Bricks) {
    this.group = scene.physics.add.group({ defaultKey: Bomberman.playerName });
    scene.physics.add.overlap(
      this.group,
      bricks.itemsGroup,
      this.#collectItem,
      collision,
    );
  }

  addPlayer(scene: GameScene, tileX: number, tileY: number) {
    const bomberman = new Bomberman(scene, tileX, tileY);
    this.group.add(bomberman);
    const allBombs = this.group
      .getChildren()
      .map(go => (go as Bomberman).bombs.group);
    scene.physics.add.collider(bomberman, scene.tileMap.itemTileSetLayer);
    scene.physics.add.collider(
      bomberman.bombs.group,
      scene.tileMap.itemTileSetLayer,
    );
    const brickCollision = scene.physics.add.collider(
      bomberman,
      scene.tileMap.bricks.group,
    );
    bomberman.setData('brickCollision', brickCollision);

    scene.physics.add.collider(bomberman.bombs.group, allBombs);

    const bombCollision = scene.physics.add.collider(bomberman, allBombs);
    bomberman.setData('bombCollision', bombCollision);

    scene.physics.add.collider(
      scene.tileMap.enemies.group,
      bomberman.bombs.group,
    );

    scene.cameras.main.startFollow(bomberman, true);
  }

  update() {
    const scene = this.group.scene as GameScene;
    if (this.group.children.size === 0) {
      this.addPlayer(scene, 1, 1);
    }
  }

  #collectItem(body1: GameObjectWithBody, body2: GameObjectWithBody) {
    const scene = body1.scene as GameScene;
    const bomberman = body1 as Bomberman;
    const item = body2 as Item;
    if (
      item.itemType === ItemType.Door &&
      scene.tileMap.enemies.group.getLength() === 0
    ) {
      // TODO: complete level
      return;
    }

    if (item.itemType !== ItemType.Door) {
      item.applySkill(bomberman);
    }
  }
}
