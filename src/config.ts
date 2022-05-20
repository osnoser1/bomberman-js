import GameConfig = Phaser.Types.Core.GameConfig;
import ScaleModes = Phaser.Scale.ScaleModes;
import Center = Phaser.Scale.Center;
import { Map } from './core/map/map';

const tileWidth = 40;
const tileHeight = 40;

export const Config = {
  scale: {
    width: 640,
    height: 520,
  },
  graphics: {
    tileWidth: tileWidth,
    tileHeight: tileHeight,
    sceneWidth: Map.Columns * tileWidth,
    sceneHeight: Map.Rows * tileHeight,
  },
};

export const phaserConfig: GameConfig = {
  type: Phaser.AUTO,
  fps: { target: 60 },
  pixelArt: true,
  scale: {
    width: Config.scale.width,
    height: Config.scale.height,
    mode: ScaleModes.FIT,
    autoCenter: Center.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};
