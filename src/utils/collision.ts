import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;
import { GameScene } from '../scenes/game';

export function collision(
  body1: GameObjectWithBody,
  body2: GameObjectWithBody,
) {
  const scene = body1.scene as GameScene;
  const bodyTileXY1 = scene.tileMap.tileMap.worldToTileXY(
    body1.body.center.x,
    body1.body.center.y,
  );
  const bodyTileXY2 = scene.tileMap.tileMap.worldToTileXY(
    body2.body.center.x,
    body2.body.center.y,
  );

  return bodyTileXY1.equals(bodyTileXY2);
}
