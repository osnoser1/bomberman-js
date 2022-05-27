import KeyboardPlugin = Phaser.Input.Keyboard.KeyboardPlugin;
import { Player } from '../player/player';
import { Input } from './gamepad';
import Buttons = Input.Buttons;
import { isNil } from 'lodash-es';
import Key = Phaser.Input.Keyboard.Key;

const Keys: Record<string, Buttons> = {
  Up: Buttons.Up,
  Down: Buttons.Down,
  Left: Buttons.Left,
  Right: Buttons.Right,
  x: Buttons.A,
  c: Buttons.B,
  Enter: Buttons.Start,
};

function keyEvent(player: Player, key: string) {
  return (keyObj: Key) => {
    const button = Keys[key];
    if (!isNil(button)) {
      player.gamepad.press(button, keyObj.isDown);
    }
  };
}

export function keyboardConnection(
  keyboardPlugin: KeyboardPlugin,
  player: Player,
) {
  const keys = keyboardPlugin.addKeys(Object.keys(Keys).join(','), true, true);
  Object.entries(keys).forEach(([key, keyObj]) => {
    keyObj.on('down', keyEvent(player, key));
    keyObj.on('up', keyEvent(player, key));
  });

  return () =>
    Object.entries(keys).forEach(([_, keyObj]) => {
      keyObj.destroy();
    });
}
