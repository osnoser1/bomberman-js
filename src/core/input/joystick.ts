// @ts-ignore
import nipplejs, { JoystickOutputData } from 'nipplejs';
import { Player } from '../player/player';
import { Input } from './gamepad';
import Buttons = Input.Buttons;

export function joystickConnection(player: Player) {
  const manager = nipplejs.create();
  const gamepad = player.gamepad;

  manager.on('end', () => {
    gamepad.pressMany(false, [
      Buttons.Right,
      Buttons.Up,
      Buttons.Left,
      Buttons.Down,
    ]);
  });

  manager.on('move', (_: any, data: JoystickOutputData) => {
    const pressedButtons: Buttons[] = [];
    const unpressedButtons: Buttons[] = [];
    let buttons: Buttons[];
    if (!data.distance) {
      return;
    }

    buttons =
      data.angle.degree <= 60 || data.angle.degree >= 300
        ? pressedButtons
        : unpressedButtons;
    buttons.push(Buttons.Right);

    buttons =
      data.angle.degree >= 30 && data.angle.degree <= 150
        ? pressedButtons
        : unpressedButtons;
    buttons.push(Buttons.Up);

    buttons =
      data.angle.degree >= 120 && data.angle.degree <= 240
        ? pressedButtons
        : unpressedButtons;
    buttons.push(Buttons.Left);

    buttons =
      data.angle.degree >= 210 && data.angle.degree <= 330
        ? pressedButtons
        : unpressedButtons;
    buttons.push(Buttons.Down);

    gamepad.pressMany(true, pressedButtons);
    gamepad.pressMany(false, unpressedButtons);
  });
}
