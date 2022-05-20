import { Game } from 'phaser';
import { phaserConfig } from './config';
import { GameScene } from './scenes/game';

new Game({ ...phaserConfig, scene: [GameScene] });
