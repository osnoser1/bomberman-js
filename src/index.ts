import { Game } from 'phaser';
import { phaserConfig } from './config';
import { GameScene } from './scenes/game';

import './index.scss';

new Game({ ...phaserConfig, scene: [GameScene] });
