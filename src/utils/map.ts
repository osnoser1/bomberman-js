import { Config } from '../config';

export function getMapTilePosition(tile: { x: number; y: number }) {
  return {
    x: Math.trunc(tile.x / Config.graphics.tile.width),
    y: Math.trunc(tile.y / Config.graphics.tile.height),
  };
}
