import { GameScene } from '../../scenes/game';
import { Bomberman } from '../bomberman';
import { TileMap } from '../../core/map/tile-map';

export class Players {
  group: Phaser.Physics.Arcade.Group;

  readonly #scene: GameScene;

  constructor(scene: GameScene) {
    this.#scene = scene;
    this.group = scene.physics.add.group({ defaultKey: Bomberman.playerName });
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
    scene.physics.add.collider(bomberman.bombs.group, allBombs);
    scene.physics.add.collider(bomberman.sprite, allBombs);
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
    tileMap: TileMap,
  ) {
    this.group.children.each(entry => {
      const player: Bomberman = entry.getData('player');
      player.update(time, delta, physics, tileMap);
    });
    if (this.group.children.size === 0) {
      this.addPlayer(this.#scene, 1, 1);
    }
  }
}
