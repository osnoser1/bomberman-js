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
    const bomberman = new Bomberman(this.group.get(), scene, tileX, tileY);
    const allBombs = this.group
      .getChildren()
      .map(go => (go.getData('player') as Bomberman).bombs.group);
    scene.physics.add.collider(
      bomberman.sprite,
      scene.tileMap.itemTileSetLayer,
    );
    scene.physics.add.collider(
      bomberman.bombs.group,
      scene.tileMap.itemTileSetLayer,
    );
    // TODO: improve to handle multiple players
    scene.physics.add
      .collider(bomberman.sprite, scene.tileMap.bricks.group)
      .setName(`playerBrickCollision`);
    scene.physics.add.collider(bomberman.bombs.group, allBombs);
    scene.physics.add
      .collider(bomberman.sprite, allBombs)
      .setName(`playerBombsCollision`);
    scene.physics.add.collider(scene.tileMap.enemies.group, [
      bomberman.bombs.group,
      scene.tileMap.bricks.group,
    ]);
    scene.physics.add.collider(
      scene.tileMap.enemies.group,
      scene.tileMap.itemTileSetLayer,
    );
    scene.cameras.main.startFollow(bomberman.sprite, true);
  }

  update(
    time: number,
    delta: number,
    physics: Phaser.Physics.Arcade.ArcadePhysics,
  ) {
    const scene = this.group.scene as GameScene;
    this.group.children.each(entry => {
      const player: Bomberman = entry.getData('player');
      player.update(time, delta, physics, scene.tileMap);
    });
    if (this.group.children.size === 0) {
      this.addPlayer(scene, 1, 1);
    }
  }

  #collectItem(body1: GameObjectWithBody, body2: GameObjectWithBody) {
    const scene = body1.scene as GameScene;
    const bomberman: Bomberman = body1.getData('player');
    const item: Item = body2.getData('player');
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
