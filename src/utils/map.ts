import { Config } from '../config';

export function getMapTilePosition(x: number, y: number) {
  return {
    x: Math.trunc(x / Config.graphics.tile.width),
    y: Math.trunc(y / Config.graphics.tile.height),
  };
}
